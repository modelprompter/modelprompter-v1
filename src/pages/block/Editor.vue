<template lang="pug">
q-page
  BlocklyWorkspace(:options='options' ref='workspaceRef' @change='workspaceEventHandler')
</template>

<script setup>
import Blockly from 'blockly'
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import theme from 'assets/blockly/theme.js'
import toolbox from 'assets/blockly/toolbox.js'
import 'assets/blockly/blocks.js'
import {ref, onMounted, onUnmounted, inject, nextTick} from 'vue'
import {useLibraryStore} from 'stores/library'
import {uid, useQuasar} from 'quasar'
import {useRoute, useRouter} from 'vue-router'

const $q = useQuasar()
const $route = useRoute()
const $router = useRouter()
const $bus = inject('$bus')
const library = useLibraryStore()
const options = {
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
  },
  toolbox,
  theme
}

// Load initial data
function loadWorkspace (workspace, view, shouldClear) {
  workspace = workspace || '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'

  workspaceRef.value.load(workspace.workspace, {
    viewLeft: view?.viewLeft || workspace.viewLeft,
    viewTop: view?.viewTop || workspace.viewTop,
    scale: view?.scale || workspace.scale,
  }, shouldClear)
}

// Loads the current workspace or the one with ID
const workspaceRef = ref()
onMounted(() => {
  if ($route.params.id) {
    const workspace = library.find($route.params.id)

    if (workspace) {
      loadWorkspace(workspace)
    } else {
      $q.notify({
        message: 'Workspace not found',
        color: 'negative',
        position: 'top',
      })
      library.currentWorkspace = {id: $route.params.id}
    }

  // Always redirect to a URL with ID (even if we have to create it)
  } else {
    if (library.currentWorkspace.id) {
      $router.push({name: 'active-block', params: {id: library.currentWorkspace.id}})
      nextTick(() => {
        $bus.emit('workspace.dashboard.main.reload', library.currentWorkspace, {
          viewLeft: library.currentWorkspace.viewLeft,
          viewTop: library.currentWorkspace.viewTop,
          scale: library.currentWorkspace.scale,
        }, true)
      })
    } else {
      library.currentWorkspace.id = uid()
      $router.push({name: 'active-block', params: {id: library.currentWorkspace.id}})
    }
  }

  $bus.on('workspace.dashboard.main.reload', onWorkspaceDashboardMainReload)
  $bus.on('dashboard.sidebar.save', onDashboardSidebarSave)
})

onUnmounted(() => {
  $bus.off('workspace.dashboard.main.reload', onWorkspaceDashboardMainReload)
  $bus.off('dashboard.sidebar.save', onDashboardSidebarSave)
})

/**
 * Reload workspace
 */
const onWorkspaceDashboardMainReload = function (workspace, view = null, shouldClear = true) {
  loadWorkspace(workspace, view, shouldClear)
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
 * Handles Workspace events
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
        data.workspace = workspaceRef.value.getWorkspaceString()
        data.id = library.currentWorkspace.id || uid()
        data.title = library.currentWorkspace.title || 'Untitled'
        data.description = library.currentWorkspace.description || ''

        library.$patch({currentWorkspace: Object.assign(library.currentWorkspace, data)})
      }
  }
}
</script>
