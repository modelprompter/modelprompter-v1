<template lang="pug">
.blockly-form(:class='{hidden: !props.isFormVisible}')
</template>

<script setup>
import {onMounted, watch} from 'vue'
import {throttle} from 'lodash-es'

const props = defineProps(['workspace', 'isFormVisible'])

watch(() => props.workspace, (workspace) => {
  regenerate(workspace)
})

onMounted(() => {
  regenerate(props.workspace)
})

/**
 * Regenerates the form
 * @param {*} workspace
 */
// @todo throttle
const regenerate = throttle(workspace => {
  if (!workspace) return
  console.log(workspace)
}, 250)

defineExpose({regenerate})
</script>

<style lang="sass">
.blockly-form
  position: absolute
  top: $toolbar-min-height - 18px
  left: 0
  right: 0
  bottom: 0
  background: red
  z-index: 10000000
  background: $light

.fullscreen .blockly-form
  top: $toolbar-min-height - 18px + 50px
</style>
