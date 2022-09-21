<template lang="pug">
span
  q-btn(v-if='!isPlaying' icon='extension' @click='runBlocks')
    span.q-ml-sm Run blocks
  q-btn(v-else color='red' icon='extension' @click='stopBlocks')
    span.q-ml-sm Stop blocks
</template>

<script setup>
import {inject} from 'vue'
const $bus = inject('$bus')
const isPlaying = $ref(false)

function runBlocks () {
  isPlaying = true
  $bus.emit('page.editor.runBlocks', isPlaying)
}

function stopBlocks () {
  isPlaying = false
  $bus.emit('page.editor.stopBlocks', isPlaying)
}
</script>
