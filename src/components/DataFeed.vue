<template lang="pug">
div#datafeed(:class='{"mp-drawer-is-maximized": settings.ui.sidebar.right.maximized, "mp-drawer-is-open": settings.ui.sidebar.right.open}')
  q-drawer.q-pa-md(v-model='settings.ui.sidebar.right.open' bordered side='right' overlay)
    .column.no-wrap(style='height: 100%;')
      div.q-pb-md
        q-btn.full-width.bg-dark.text-white(color='light' v-if='settings.ui.sidebar.right.maximized' icon='last_page' @click='settings.ui.sidebar.right.maximized = false')
          span.q-ml-sm Close Data Feed
        q-btn.full-width.bg-dark.text-white(color='light' v-else icon='first_page' @click='settings.ui.sidebar.right.maximized = true')
          span.q-ml-sm Open Data Feed
      div(style='height: 100%; overflow-y: auto;')
        div(:class="{masonry: !$q.platform.is.mobile && settings.ui.sidebar.right.maximized}")
          //- div.q-pa-xs(v-for='(item, i) in dataFeed.data' :data='item' :class='[settings.ui.sidebar.right.maximized ? "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" : "col-12"]')
          div.q-pa-xs(v-for='(item, i) in dataFeed.data' :data='item')
            q-card
              img.clickable(v-if='item.image' :src='item.image' @click='expandImage(item)')
              q-card-section(v-if='!item.image && !item.title')
                pre {{item.data}}
              q-card-section(v-if='item.title')
                div(v-html='item.title')

    //- Image Modal
    q-dialog(v-model='imageModal')
      q-card(style='min-width: 300px')
        q-img(native-context-menu :src='imageModalActiveImage.image' :style='{width: imageModalActiveImage.width, height: imageModalActiveImage.height}')
        q-card-section
          pre(style='font-size:1.15em') {{imageModalActiveImage}}
        q-card-actions(align='right')
</template>

<script setup>
import {useDatafeedResponses} from '../stores/datafeed'
import {useSettingsStore} from '../stores/settings'
import {useQuasar} from 'quasar'

const $q = useQuasar()
const props = defineProps(['data'])
const dataFeed = useDatafeedResponses()
const settings = useSettingsStore()
const imageModal = $ref(false)
const imageModalActiveImage = $ref({})

function expandImage (data) {
  imageModal = true
  imageModalActiveImage = data
}
</script>

<style lang="sass" scoped>
#datafeed
  width: 512px
</style>
