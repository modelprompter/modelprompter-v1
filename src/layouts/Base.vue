<template lang="pug">
q-layout(view='hHh lpR fFf' :class='{"mp-has-maximized-drawer": hasExpandedDrawer}')
  //- Toolbar
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='settings.ui.sidebar.left.open = !settings.ui.sidebar.left.open')
      q-toolbar-title
        span
          router-link.text-decoration-none.text-white(:to='{path: "/"}')
            img.gt-sm.q-mr-sm(src='~/src/assets/logo-title.png' height=32 style='vertical-align: middle')
            img.lt-md.q-mr-sm(src='~/src/assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
          a(href='https://github.com/modelprompter/modelprompter/releases' target='_blank')
            small.gt-xs.q-ml-sm(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{pkg.version}}
      q-space
      router-view(name='toolbar')
      q-btn.q-ml-md(flat dense round icon='menu' aria-label='Menu' @click='settings.ui.sidebar.right.open = !settings.ui.sidebar.right.open')

  //- Left Sidebar
  div(:class='{"mp-drawer-is-maximized": settings.ui.sidebar.left.maximized}')
    q-drawer(v-model='settings.ui.sidebar.left.open' bordered)
      q-list
        q-item-label(header align='right')
          q-btn.bg-dark.text-white(v-if='settings.ui.sidebar.left.maximized' icon-right='west' @click='settings.ui.sidebar.left.maximized = false')
            span.q-mr-sm Collapse Dashboard
          q-btn.bg-dark.text-white(v-else icon-right='east' @click='settings.ui.sidebar.left.maximized = true')
            span.q-mr-sm Expand Dashboard
        EssentialLink(v-for='link in essentialLinks' :key='link.title' v-bind='link')

  //- Right Sidebar
  DataFeed(:data='dataFeed.data')

  //- Main Content
  q-page-container
    slot
      router-view
</template>



<script setup>
import PKG from '/package.json'
import EssentialLink from 'components/EssentialLink.vue'
import DataFeed from 'components/DataFeed.vue'
import {useDatafeedResponses} from '../stores/datafeed'
import { useSettingsStore } from '../stores/settings'
import { LocalStorage } from 'quasar'
import {inject, watch, computed} from 'vue'

const $bus = inject('$bus')
const settings = useSettingsStore()
const dataFeed = useDatafeedResponses()

const hasExpandedDrawer = computed(() => {
  return (settings.ui.sidebar.left.open && settings.ui.sidebar.left.maximized) || (settings.ui.sidebar.right.open && settings.ui.sidebar.right.maximized)
})

const essentialLinks = $ref([
  // {
  //   title: 'Quick Prompter',
  //   caption: 'Ask a model for something',
  //   icon: 'space_bar',
  //   link: '/quick',
  // },
  {
    title: 'Block Prompter',
    caption: 'Ask a model for something',
    icon: 'extension',
    link: '/block',
  }
])
const pkg = $ref(PKG)


/**
 * Open the data feed
 */
watch(() => dataFeed.isRunning, () => {
  if (dataFeed.isRunning) {
    settings.ui.sidebar.right.open = true
  }
})
</script>
