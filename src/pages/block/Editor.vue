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
import {LocalStorage} from 'quasar'
import {defaultsDeep} from 'lodash-es'
import {ref, onMounted} from 'vue'
import defaultWorkspace from '../../stores/workspaces/index.js'

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

let viewLeft = 0
let viewTop = 0
let scale = 0


// Load initial data
const workspaceRef = ref()
onMounted(() => {
  const data = defaultsDeep(LocalStorage.getItem('blockprompter.current'), defaultWorkspace["blockprompter.current"])
  workspaceRef.value.load(data.workspace || defaultWorkspace["blockprompter.current"].workspace, {
    viewLeft: data.viewLeft,
    viewTop: data.viewTop,
    scale: data.scale,
  })
})



/**
 * Handles Workspace events
 */
function workspaceEventHandler (ev, workspace) {
  switch (ev.type) {
    case Blockly.Events.VIEWPORT_CHANGE:
    case Blockly.Events.BLOCK_DELETE:
    case Blockly.Events.BLOCK_CHANGE:
    case Blockly.Events.BLOCK_MOVE:
    case Blockly.Events.VAR_CREATE:
    case Blockly.Events.VAR_DELETE:
    case Blockly.Events.VAR_RENAME:
      if (ev.type === Blockly.Events.VIEWPORT_CHANGE) {
        viewLeft = ev.viewLeft
        viewTop = ev.viewTop
        scale = ev.scale
      }
      const data = {viewLeft, viewTop, scale}
      data.workspace = workspaceRef.value.getWorkspaceString()
      autosave(data)
  }
}

/**
 * Autosave the workspace
 */
// @todo debounce
function autosave (data) {
  LocalStorage.set('blockprompter.current', data)
}
</script>
