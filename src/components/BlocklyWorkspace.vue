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
import {useSettingsStore} from 'stores/settings'
import {merge} from 'lodash-es'
import theme from 'assets/blockly/theme.js'
import toolbox from 'assets/blockly/toolbox.js'

const emit = defineEmits(['onFullscreenToggle', 'onIsRunning'])
const props = defineProps([
  'title',
  'isMain',
  'isFullscreen',
  'hideFullscreenToggle',
  'hideToolbox',
  'options',
  'loadData',
  'workspaceID',
  'static'
])

const library = useLibraryStore()
const settings = useSettingsStore()
const dataFeed = useDatafeedResponses()
const $bus = inject('$bus')
const blocklyToolbox = $ref()
const blockly = $ref()
let workspace = shallowRef()
let code = $ref('')

const $q = useQuasar()
let isFullscreen = $ref(props.isFullscreen)
let isRunning = $ref(false)

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
const onWorkspaceReload = function (workspace, shouldClear = true) {
  maybeToggleToolbox()
  load(workspace, shouldClear)
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
  if (props.static) return

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
const load = function (data = {}, shouldClear) {
  // Defaults
  data.workspace = data.workspace || {}
  data.view  = {
    left: data.view?.left || 0,
    top: data.view?.top || 0,
    scale: data.view?.scale || 1,
  }
  shouldClear && Blockly.mainWorkspace.clear()

  // Load data
  Blockly.serialization.workspaces.load(data.workspace || {}, workspace)

  // Update view
  workspace.setScale(data.view.scale)
  workspace.scroll(data.view.left*-1, data.view.top*-1)

  // Update comments
  if (data.comments) {
    // Prevent focus
    const $focus = HTMLTextAreaElement.prototype.focus

    // Open comments
    Object.keys(data.comments).forEach(key => {
      const comment = data.comments[key]
      const block = workspace.getBlockById(key)
      if (block?.comment && comment.isOpen) {
        HTMLTextAreaElement.prototype.focus = function () {}
        block.comment.setVisible(true)
        moveComment(block, comment.x, comment.y)
      }
      window.b = block
    })

    // Allow focus
    HTMLTextAreaElement.prototype.focus = $focus
  }

  title.value = data?.title
}



/**
 * Moves a comment on the workspace
 */
const moveComment = function (block, x = 0, y = 0) {
  block.comment.bubble_.autoLayout = false
  block.comment.bubble_.moveDuringDrag(block.workspace.getBlockDragSurface(), {x, y})
  block.comment.bubble_.moveTo(x, y)
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
const feedSendData = function (feedData) {
  const data = {
    title: feedData.title,
    data: feedData.data,
    image: feedData.image,
    id: uid(),
  }

  $bus.emit('data.responses.push', data)
  dataFeed.data.unshift(data)
}


/**
 * POST to a server
 * Callbacks will get halted
 */
const dispatchREST = function (method, url, data, onThen, onError, onFinally) {
  setTimeout(() => {
    console.log(`Sending ${method}:`, url, data)

    const api = axios({
      method,
      url,
      data
    }).then((res) => {
      isRunning && onThen(res.data)
      return res
    }).catch((err) => {
      onError(err)
    }).then((data) => {
      isRunning && onFinally(data?.data)
    })
  }, 0)
}

/**
 * Set workspace running state
 */
const stopWorkspace = function () {
  isRunning = false
}
function setState (state) {
  isRunning = state
}


/**
 * Run start/close blocks
 */
watch(() => isRunning, () => {
  settings.ui.sidebar.right.open = true
  emit('onIsRunning', isRunning)

  if (isRunning) {
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
let hasLoaded = false

function workspaceEventHandler (ev) {
  let comments = library.currentWorkspace.comments || {}
  // console.log('Event', ev)

  switch (ev.type) {
    case Blockly.Events.FINISHED_LOADING:
      hasLoaded = true

    // Comments
    case 'BUBBLE_MOVE':
      comments[ev.blockId] = comments[ev.blockId] || {}
      comments[ev.blockId].x = ev.x
      comments[ev.blockId].y = ev.y

    case Blockly.Events.BUBBLE_OPEN:
      comments[ev.blockId] = comments[ev.blockId] || {}

      if (ev.type === Blockly.Events.BUBBLE_OPEN) {
        comments[ev.blockId].isOpen = ev.isOpen
      }

      // Listen to bubble events
      if (comments[ev.blockId].isOpen) {
        const block = workspace.getBlockById(ev.blockId)
        if (block?.comment) {
          const x = block.comment.bubble_.getRelativeToSurfaceXY().x
          const y = block.comment.bubble_.getRelativeToSurfaceXY().y

          block.comment.bubble_.moveCallback_ = function () {
            workspaceEventHandler({
              type: 'BUBBLE_MOVE',
              blockId: ev.blockId,
              x, y,
            })
          }

          if (ev.type === Blockly.Events.BUBBLE_OPEN) {
            typeof comments[ev.blockId].x !== 'undefined' && moveComment(block, comments[ev.blockId].x, comments[ev.blockId].y)
          } else {
            comments[ev.blockId].x = x
            comments[ev.blockId].y = y
          }
        }
      }

    // Update comment position
    case Blockly.Events.BLOCK_MOVE:
      comments[ev.blockId] = comments[ev.blockId] || {}
      if (comments[ev.blockId].isOpen && ev.type === Blockly.Events.BLOCK_MOVE) {
        comments[ev.blockId].x += ev.newCoordinate.x - ev.oldCoordinate.x
        comments[ev.blockId].y += ev.newCoordinate.y - ev.oldCoordinate.y
      }


    // Autosave
    case Blockly.Events.VIEWPORT_CHANGE:
    case Blockly.Events.BLOCK_DELETE:
    case Blockly.Events.BLOCK_CHANGE:
    case Blockly.Events.VAR_CREATE:
    case Blockly.Events.VAR_DELETE:
    case Blockly.Events.VAR_RENAME:
      if (hasLoaded && (!props.static && props.static !== '')) {
        const view = {
          left: library.currentWorkspace?.view?.left || 0,
          top: library.currentWorkspace?.view?.top || 0,
          scale: library.currentWorkspace?.view?.scale || 1,
        }
        if (ev.type === Blockly.Events.VIEWPORT_CHANGE) {
          view.left = ev.viewLeft
          view.top = ev.viewTop
          view.scale = ev.scale
        }

        // Store the workspace and generate an ID
        library.$patch({currentWorkspace: merge({}, {
          id: library.currentWorkspace.id || uid(),
          meta: {
            title: library.currentWorkspace.title || 'Untitled',
            descrition: library.currentWorkspace.description || ''
          },
          view,
          comments: merge({}, library.currentWorkspace.comments || {}, comments),
          embed: view,
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
defineExpose({workspace, load, code, setState})
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
