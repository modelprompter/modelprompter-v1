<template lang="pug">
q-drawer(v-model='isRightSidebarOpened' bordered side='right')
  q-list
    q-item-label(header) Data feed
  .q-pa-md
    q-card.q-mb-md(v-for='(item, i) in dataFeed.data' :data='item')
      q-img.clickable(v-if='item.image' :src='item.image' @click='expand(item)')
      q-card-section(v-else)
        pre {{item.data}}

  //- Image Modal
  q-dialog(v-model='imageModal')
    q-card(style='min-width: 300px')
      q-img(native-context-menu :src='imageModalActiveImage.image' :style='{width: imageModalActiveImage.width, height: imageModalActiveImage.height}')
      q-card-section
        pre(style='font-size:1.15em') {{imageModalActiveImage}}
      q-card-actions(align='right')
          q-btn(flat round color='negative' icon='delete' @click='deleteImage($event, imageModalActiveImage)')
          q-space
          q-btn(flat round color='secondary' icon='save' @click='downloadImage($event, imageModalActiveImage)')
</template>

<script setup>
import {useDatafeedResponses} from '../stores/datafeed'

const props = defineProps(['data', 'isRightSidebarOpened'])
const dataFeed = useDatafeedResponses()
const imageModal = $ref(false)
const imageModalActiveImage = $ref({})

function expand (data) {
  imageModal = true
  imageModalActiveImage = data
}
</script>
