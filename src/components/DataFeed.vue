<template lang="pug">
q-drawer(v-model='isRightSidebarOpened' bordered side='right')
  q-list
    q-item-label(header) Data feed
  .q-pa-md
    DataFeedItem.q-mb-md(v-for='(item, i) in dataFeed.data' :data='item')
</template>

<script setup>
import DataFeedItem from './DataFeedItem.vue'
import {useDatafeedResponses} from '../stores/datafeed'

const props = defineProps(['data', 'isRightSidebarOpened'])
const dataFeed = useDatafeedResponses()
</script>
