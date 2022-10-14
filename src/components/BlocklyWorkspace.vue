<template lang="pug">
.blockly-container
  .blockly(ref='blockly')
    q-resize-observer(@resize='resize')
  .hidden(ref='blocklyToolbox')
    slot
</template>

<script setup>
import Blockly from 'blockly'
import 'assets/blockly/blocks.js'
import {onMounted, onUnmounted, shallowRef, inject, watch} from 'vue'
import axios from 'axios'
import {LocalStorage, uid, useQuasar} from 'quasar'
import {useDatafeedResponses} from '../stores/datafeed'
import {useLibraryStore} from 'stores/library'
import {get, merge} from 'lodash-es'
import theme from 'assets/blockly/theme.js'
import toolbox from 'assets/blockly/toolbox.js'

const library = useLibraryStore()
const dataFeed = useDatafeedResponses()
const $bus = inject('$bus')
const props = defineProps(['isMain', 'options', 'loadData', 'workspaceID'])
const blocklyToolbox = $ref()
const blockly = $ref()
let workspace = shallowRef()
let code = $ref('')

const emit = defineEmits(['change'])
const $q = useQuasar()

// Globals for Blockly
window.get = get
window.merge = merge

/**
 * Mount
 */
onMounted(() => {
  // Listeners
  $bus.on('workspace.dashboard.main.reload', onWorkspaceDashboardMainReload)
  $bus.on('dashboard.sidebar.save', onDashboardSidebarSave)

  // Create workspace
  const options = merge({}, {
    media: "media/",
    grid: {
      spacing: 20,
      length: 20,
      colour: "#4f4b94",
      snap: true,
    },
    trashcan: true,
    // @todo make this optional
    // horizontalLayout: true,
    zoom: {
      controls: true,
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
  workspace.addChangeListener(onChange)

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
  const workspaceData = library.find(props.workspaceID)
  if (workspaceData) {
    load(workspaceData, workspaceData, true)
  } else {
    $q.notify({
      message: 'Workspace not found',
      color: 'negative',
      position: 'top',
    })
  }
})

/**
 * Unmount
 */
onUnmounted(() => {
  $bus.off('workspace.dashboard.main.reload', onWorkspaceDashboardMainReload)
  $bus.off('dashboard.sidebar.save', onDashboardSidebarSave)
})

/**
 * Reload workspace
 */
const onWorkspaceDashboardMainReload = function (workspace, view = null, shouldClear = true) {
  if (props.isMain) {
    load(workspace, view, shouldClear)
  }
}

/**
 * Saves a copy of the current workspace
 */
const onDashboardSidebarSave = function () {
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
  data.workspace = data.workspace || '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
  view  = {
    viewLeft: view.viewLeft || data.viewLeft,
    viewTop: view.viewTop || data.viewTop,
    scale: view.scale || data.scale,
  }
  shouldClear && Blockly.mainWorkspace.clear()

  // Load data
  Blockly.Xml.domToWorkspace(
    Blockly.Xml.textToDom(data.workspace),
    workspace
  )

  // Update view
  workspace.setScale(view.scale)
  if (!view.viewLeft && !view.viewTop && !view.scale) {
    workspace.scrollCenter()
  } else {
    workspace.scroll(view.viewLeft*-1, view.viewTop*-1)
  }
}



/**
 * Gets the Blockly workspace as a string for saving
 * @return the current workspace string
 */
const getWorkspaceString = function (data) {
  return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))
}




/**
 * Emits the workspace and triggers an autosave in the component above
 */
function onChange (ev) {
  emit('change', ev, workspace)
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

function workspaceEventHandler (ev, workspace) {
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
        }

        // Store the workspace and generate an ID
        const data = {viewLeft, viewTop, scale}
        data.workspace = workspace.getWorkspaceString()
        data.id = library.currentWorkspace.id || uid()
        data.title = library.currentWorkspace.title || 'Untitled'
        data.description = library.currentWorkspace.description || ''

        library.$patch({currentWorkspace: Object.assign(library.currentWorkspace, data)})
      }
  }
}


/**
 * Final stuff
 */
defineExpose({workspace, getWorkspaceString, load, code})
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
