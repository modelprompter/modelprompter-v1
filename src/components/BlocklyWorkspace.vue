<template lang="pug">
.blockly-container(:class='{"fullscreen": isFullscreen}')
  BlocklyWorkspaceToolbar(
    :title='title'
    :hideFullscreenToggle='hideFullscreenToggle'
    :isFullscreen='isFullscreen'
    @fullscreenToggled='onFullscreenToggle')
  .blockly(ref='blockly')
    q-resize-observer(@resize='resize')
  .hidden(ref='blocklyToolbox')
    slot
</template>

<script setup>
import BlocklyWorkspaceToolbar from 'components/BlocklyWorkspaceToolbar.vue'

import Blockly from 'blockly'
import 'assets/blockly/blocks.js'
import {onMounted, onUnmounted, shallowRef, inject, ref, watch} from 'vue'
import axios from 'axios'
import {LocalStorage, uid, useQuasar} from 'quasar'
import {useDatafeedResponses} from '../stores/datafeed'
import {useLibraryStore} from 'stores/library'
import {merge} from 'lodash-es'
import theme from 'assets/blockly/theme.js'
import toolbox from 'assets/blockly/toolbox.js'

const emit = defineEmits(['onFullscreenToggle'])
const props = defineProps([
  'title',
  'isMain',
  'isFullscreen',
  'hideFullscreenToggle',
  'hideToolbox',
  'options',
  'loadData',
  'workspaceID'
])

const library = useLibraryStore()
const dataFeed = useDatafeedResponses()
const $bus = inject('$bus')
const blocklyToolbox = $ref()
const blockly = $ref()
let workspace = shallowRef()
let code = $ref('')

const $q = useQuasar()
let isFullscreen = $ref(props.isFullscreen)

let title = ref('')

/**
 * Mount
 */
onMounted(() => {
  // Listeners
  $bus.on('workspace.reload', onWorkspaceReload)
  $bus.on('workspace.save', onWorkspaceSave)

  // Create workspace
  const options = merge({}, {
    media: "media/",
    grid: {
      spacing: 20,
      length: 20,
      colour: "#4f4b94",
      snap: true,
    },
    move: {
      scrollbars: true,
      drag: true,
    },
    trashcan: false,
    // @todo make this optional
    // horizontalLayout: true,
    zoom: {
      controls: false,
      wheel: true,
      startScale: 1,
      maxScale: 3,
      minScale: .3,
      scaleSpeed: 1.2,
      pinch: true
    }
  }, props.options)

  if (!options.toolbox) {
    options.toolbox = toolbox
  }

  if (!options.theme) {
    options.theme = theme
  }

  workspace = Blockly.inject(blockly, options)
  workspace.addChangeListener(workspaceEventHandler)

  // Add class names to blocks
  // @see https://groups.google.com/g/blockly/c/SwGzTvSo1H8/m/LjIRnlXbDAAJ
  Object.keys(Blockly.Blocks).forEach((blockId) => {
    const block = Blockly.Blocks[blockId]
    if (block.init) {
      const oldInit = block.init
      block.init = function() {
        if (oldInit) oldInit.call(this)
        // create whatever class name you want, assuming you want a different one for each type of block
        const className = `blockly-block-${blockId} blockly-category-${this.styleName_}`
        // This adds a class to the whole block, you'd have to use the right css selector to grab .blocklyText that is a descendant of this class
        Blockly.utils.dom.addClass(this.getSvgRoot(), className)
      }
    }
  })

  // Load workspace by ID
  const data = library.find(props.workspaceID)
  if (data) {
    load(data, data, true)
  } else if (props.workspaceID) {
    $q.notify({
      message: 'Workspace not found',
      color: 'negative',
      position: 'top',
    })
  }

  title.value = data?.title
  maybeToggleToolbox()
})

/**
 * Unmount
 */
onUnmounted(() => {
  $bus.off('workspace.reload', onWorkspaceReload)
  $bus.off('workspace.save', onWorkspaceSave)
})

/**
 * Reload workspace
 */
const onWorkspaceReload = function (workspace, view = null, shouldClear = true) {
  maybeToggleToolbox()
  load(workspace, view, shouldClear)
}

/**
 * Toggle the toolbox based on isFullscreen
 */
const maybeToggleToolbox = function () {
  if (props.isFullscreen) {
    workspace.getToolbox().setVisible(true)
  } else {
    workspace.getToolbox().setVisible(false)
  }
}
watch(props, maybeToggleToolbox)

/**
 * Saves a copy of the current workspace
 */
const onWorkspaceSave = function () {
  // See if a workspace exists with id, if it does merge it otherwise push it
  const index = library.workspaces.findIndex(workspace => workspace.id === library.currentWorkspace.id)
  if (index > -1) {
    library.workspaces[index] = {...library.currentWorkspace}
  } else {
    library.workspaces.push({...library.currentWorkspace})
  }
}

/**
 * Load initial data
 */
const load = function (data = {}, view = {}, shouldClear) {
  // Defaults
  data.workspace = data.workspace || ''
  view  = {
    viewLeft: view.viewLeft || data.viewLeft,
    viewTop: view.viewTop || data.viewTop,
    scale: view.scale || data.scale,
  }
  shouldClear && Blockly.mainWorkspace.clear()

  // Load data
  Blockly.serialization.workspaces.load(data.workspace || {}, workspace)

  // Update view
  workspace.setScale(view.scale)
  if (!view.viewLeft && !view.viewTop && !view.scale) {
    workspace.scrollCenter()
  } else {
    workspace.scroll(view.viewLeft*-1, view.viewTop*-1)
  }

  title.value = data?.title
}








/**
 * Handle resize event
 */
function resize () {
  Blockly.svgResize(workspace)
}


/**
 * Send data to feed
 */
window.feedSendData = function (feedData) {
  const data = {
    title: feedData.title,
    data: feedData.data,
    image: feedData.image,
    id: uid(),
  }

  $bus.emit('data.responses.push', data)
  dataFeed.data.unshift(data)
}

window.LocalStorage = LocalStorage


/**
 * POST to a server
 * Callbacks will get halted
 */
window.dispatchREST = function (method, url, data, onThen, onError, onFinally) {
  setTimeout(() => {
    console.log(`Sending ${method}:`, url, data)

    const api = axios({
      method,
      url,
      data
    }).then((res) => {
      dataFeed.isRunning && onThen(res.data)
      return res
    }).catch((err) => {
      onError(err)
    }).then((data) => {
      dataFeed.isRunning && onFinally(data?.data)
    })
  }, 0)
}

/**
 * Run start/close blocks
 */
watch(() => dataFeed.isRunning, () => {
  if (dataFeed.isRunning) {
    code = Blockly.JavaScript.workspaceToCode(workspace)
    code = `;(function () {
      ${code}
    })();`

    console.log(`

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.
*・°☆.。.:*・°☆.。.:*・°☆. GENERATING CODE ☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.`)
    console.dir({code})
    eval(code)
  } else {
    dataFeed.hasRanLastMethods = false
    dataFeed.onEndMethods.forEach(func => {
      func()
    })
    dataFeed.onEndMethods = []
    dataFeed.hasRanLastMethods = true
  }
})


/**
 * Handles Workspace events
 * - Save data
 */
let viewLeft = 0
let viewTop = 0
let scale = 0
let hasLoaded = false

function workspaceEventHandler (ev) {
  switch (ev.type) {
    case Blockly.Events.FINISHED_LOADING:
      hasLoaded = true

    case Blockly.Events.VIEWPORT_CHANGE:
    case Blockly.Events.BLOCK_DELETE:
    case Blockly.Events.BLOCK_CHANGE:
    case Blockly.Events.BLOCK_MOVE:
    case Blockly.Events.VAR_CREATE:
    case Blockly.Events.VAR_DELETE:
    case Blockly.Events.VAR_RENAME:
      if (hasLoaded) {
        if (ev.type === Blockly.Events.VIEWPORT_CHANGE) {
          viewLeft = ev.viewLeft
          viewTop = ev.viewTop
          scale = ev.scale
        } else {
          viewLeft = library.currentWorkspace?.view?.left
          viewTop = library.currentWorkspace?.view?.left
          scale = library.currentWorkspace?.view?.left
        }

        // Store the workspace and generate an ID
        // @todo this looks kind of crazy
        library.$patch({currentWorkspace: merge({}, {
          id: library.currentWorkspace.id || uid(),
          meta: {
            title: library.currentWorkspace.title || 'Untitled',
            descrition: library.currentWorkspace.description || ''
          },
          view: {
            scale: scale,
            left: viewLeft,
            top: viewTop
          },
          embed: {
            scale: scale,
            left: viewLeft,
            top: viewTop
          },
          workspace: Blockly.serialization.workspaces.save(workspace)
        })})
      }
  }
}


/**
 * Fullscreen toggle
 */
function onFullscreenToggle ($event) {
  isFullscreen = $event
  emit('onFullscreenToggle', $event)
}


/**
 * Final stuff
 */
defineExpose({workspace, load, code})
</script>

<style scoped>
.blockly-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: left;
}
.blockly, .blockly svg {
  width: 100%;
  height: 100%;
}
</style>
