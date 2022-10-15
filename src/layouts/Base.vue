<template lang="pug">
q-layout(view='hHh lpR fFf' :class='{"mp-has-maximized-drawer": hasExpandedDrawer, "mp-left-drawer-open": settings.ui.sidebar.left.open}')
  //- Toolbar
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftSidebar')
      q-toolbar-title
        span
          router-link.text-decoration-none.text-white(:to='{path: "/"}')
            span(v-if='settings.ui.sidebar.left.open && settings.ui.sidebar.right.open')
              img.q-mr-sm(src='~/src/assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
            span(v-else)
              img.gt-sm.q-mr-sm(src='~/src/assets/logo-title.png' height=32 style='vertical-align: middle')
              img.lt-md.q-mr-sm(src='~/src/assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
          a(href='https://github.com/modelprompter/modelprompter/releases' target='_blank')
            small.gt-xs.q-ml-sm(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{pkg.version}}
      q-space
      router-view(name='toolbar')
      q-btn.q-ml-md(flat dense round icon='menu' aria-label='Menu' @click='toggleRightSidebar')

  //- Sidebars
  DashboardSidebar
    router-view(name='dashboardSidebar')
    router-view(name='dashboardMain')
  DataFeed(:data='dataFeed.data')

  //- Main Content
  q-page-container
    slot
      router-view
</template>



<script setup>
import PKG from '/package.json'
import DataFeed from '../components/DataFeed.vue'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import {useDatafeedResponses} from '../stores/datafeed'
import { useSettingsStore } from '../stores/settings'
import {watch, computed} from 'vue'

const settings = useSettingsStore()
const dataFeed = useDatafeedResponses()

const hasExpandedDrawer = computed(() => {
  return (settings.ui.sidebar.left.open && settings.ui.sidebar.left.maximized) || (settings.ui.sidebar.right.open && settings.ui.sidebar.right.maximized)
})

const pkg = $ref(PKG)

// Open the data feed when APIs are started
watch(() => dataFeed.isRunning, () => {
  if (dataFeed.isRunning) {
    settings.ui.sidebar.right.open = true
  }
})

function toggleLeftSidebar () {
  settings.ui.sidebar.left.open = !settings.ui.sidebar.left.open

  if (settings.ui.sidebar.right.maximized) {
    settings.ui.sidebar.left.open = true
    settings.ui.sidebar.right.open = true
    settings.ui.sidebar.right.maximized = false
  }
}
function toggleRightSidebar () {
  settings.ui.sidebar.right.open = !settings.ui.sidebar.right.open

  if (settings.ui.sidebar.left.maximized) {
    settings.ui.sidebar.right.open = true
    settings.ui.sidebar.left.open = true
    settings.ui.sidebar.left.maximized = false
  }
}
</script>
