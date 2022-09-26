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
import {ref, onMounted, inject} from 'vue'
import {useLibraryStore} from 'stores/library'
import {uid} from 'quasar'

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
const workspaceRef = ref()
onMounted(() => {
  workspaceRef.value.load(library.workspaces.current.workspace, {
    viewLeft: library.workspaces.current.viewLeft,
    viewTop: library.workspaces.current.viewTop,
    scale: library.workspaces.current.scale,
  })
})


// Saves a copy of the current workspace
$bus.on('dashboard.sidebar.save', () => {
  library.workspaces[library.workspaces.current.id] = library.workspaces.current
})



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
        data.id = library.workspaces.current.id || uid()

        library.workspaces.current = Object.assign(library.workspaces.current, data)
      }
  }
}
</script>
