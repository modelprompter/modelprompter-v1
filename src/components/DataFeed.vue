<template lang="pug">
div(:class='{"mp-drawer-is-maximized": isExpanded}')
  q-drawer(v-model='isRightSidebarOpened' bordered side='right')
    q-list
      q-item-label(header)
        q-btn.bg-dark.text-white(v-if='isExpanded' icon='east' @click='toggleExpand')
          span.q-ml-sm Collapse Data Feed
        q-btn.bg-dark.text-white(v-else icon='west' @click='toggleExpand')
          span.q-ml-sm Expand Data Feed
    .q-pa-md
      .row.q-col-gutter-md.items-start
        q-card.q-mb-md(v-for='(item, i) in dataFeed.data' :data='item' :class='[isExpanded ? "col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-1" : "col-6"]')
          q-img.clickable(v-if='item.image' :src='item.image' @click='expandImagine(item)')
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
import {inject} from 'vue'

const props = defineProps(['data', 'isRightSidebarOpened'])
const dataFeed = useDatafeedResponses()
const imageModal = $ref(false)
const imageModalActiveImage = $ref({})
const isExpanded = $ref(false)
const $bus = inject('$bus')

function expandImage (data) {
  imageModal = true
  imageModalActiveImage = data
}


$bus.on('layout.sidebar.right.close', () => {
  isExpanded = false
  $bus.emit('layout.sidebar.right.resize', isExpanded)
})
function toggleExpand () {
  isExpanded = !isExpanded
  $bus.emit('layout.sidebar.right.resize', isExpanded)
}
</script>
