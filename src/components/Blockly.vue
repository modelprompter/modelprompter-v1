<template lang="pug">
.blockly-container
  .blockly(ref='blockly')
  .hidden(ref='blocklyToolbox')
    slot
</template>

<script setup>
import Blockly from 'blockly'
import {onMounted, shallowRef} from 'vue'

const props = defineProps(['options'])
const blocklyToolbox = $ref()
const blockly = $ref()
let workspace = shallowRef()

defineExpose({workspace})

onMounted(() => {
  const options = props.options || {}
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox
  }
  workspace = Blockly.inject(blockly, options)
})
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
