<template lang="pug">
q-btn(v-if='!isRunning' icon='extension' @click='toggleBlocks')
  span.q-ml-sm Run blocks
q-btn(v-else color='red' icon='extension' @click='toggleBlocks')
  span.q-ml-sm Stop blocks
</template>

<script setup>
import {useDatafeedResponses} from 'stores/datafeed'

const dataFeed = useDatafeedResponses()
const props = defineProps(['target'])
const emit = defineEmits(['toggled'])

let isRunning = $ref(false)

function toggleBlocks () {
  if (!props.target) {
    isRunning = dataFeed.isRunning = !dataFeed.isRunning
  } else {
    isRunning = !isRunning
    emit('toggled', props.target, isRunning)
  }
}

function setState (state) {
  isRunning = state
}

defineExpose({setState})
</script>
