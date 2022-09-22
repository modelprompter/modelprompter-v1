<template lang="pug">
q-page
  BlocklyWorkspace(:options='options' ref='workspaceRef' @change='workspaceEventHandler')
</template>

<script setup>
import Blockly from 'blockly'
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import theme from 'assets/blockly/theme.js'
import toolbox from 'assets/blockly/toolbox.js'
import blocks from 'assets/blockly/blocks.js'
import {LocalStorage, uid} from 'quasar'
import {defaultsDeep} from 'lodash-es'
import {nextTick, inject, ref, onMounted} from 'vue'
import defaultWorkspace from '../../stores/workspaces/index.js'

const $bus = inject('$bus')

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
const data = defaultsDeep(LocalStorage.getItem('blockprompter.current'), {
  workspace: ''
})
onMounted(() => {
  workspaceRef.value.load(data.workspace || defaultWorkspace.workspace)
})



/**
 * Handles Workspace events
 */
function workspaceEventHandler (ev, workspace) {
  switch (ev.type) {
    // case Blockly.Events.FINISHED_LOADING:
    //   hasLoaded = true
    // break

    // case Blockly.Events.BLOCK_CREATE:
    case Blockly.Events.BLOCK_DELETE:
    case Blockly.Events.BLOCK_CHANGE:
    case Blockly.Events.BLOCK_MOVE:
    case Blockly.Events.VAR_CREATE:
    case Blockly.Events.VAR_DELETE:
    case Blockly.Events.VAR_RENAME:
      // $refs.workspace.run()
      // checkBookmarks()
      // hasLoaded && autosave()
      autosave({workspace})
    break
  }
}

/**
 * Autosave the workspace
 */
// @todo debounce
function autosave () {
  LocalStorage.set('blockprompter.current', {
    workspace: workspaceRef.value.getWorkspaceString()
  })
}
</script>
