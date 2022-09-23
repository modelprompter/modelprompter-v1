<template lang="pug">
span
  q-btn(v-if='!dataFeed.isRunning' icon='extension' @click='dataFeed.isRunning = true')
    span.q-ml-sm Run blocks
  q-btn(v-else color='red' icon='extension' @click='dataFeed.isRunning = false')
    span.q-ml-sm Stop blocks
</template>

<script setup>
import {useDatafeedResponses} from '../../stores/datafeed'
const dataFeed = useDatafeedResponses()
</script>
