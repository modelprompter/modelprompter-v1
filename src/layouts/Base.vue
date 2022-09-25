<template lang="pug">
q-layout(view='hHh lpR fFf' :class='{"mp-has-maximized-drawer": isExpanded || isRightExpanded}')
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftSidebar')
      q-toolbar-title
        span
          router-link.text-decoration-none.text-white(:to='{path: "/"}')
            img.gt-sm.q-mr-sm(src='~/src/assets/logo-title.png' height=32 style='vertical-align: middle')
            img.lt-md.q-mr-sm(src='~/src/assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
          a(href='https://github.com/modelprompter/modelprompter/releases' target='_blank')
            small.gt-xs.q-ml-sm(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{pkg.version}}
      q-space
      router-view(name='toolbar')
      q-btn.q-ml-md(flat dense round icon='menu' aria-label='Menu' @click='toggleRightSidebar')

  div(:class='{"mp-drawer-is-maximized": isExpanded}')
    q-drawer(v-model='isLeftSidebarOpened' bordered)
      q-list
        q-item-label(header align='right')
          q-btn.bg-dark.text-white(v-if='isExpanded' icon-right='west' @click='isExpanded = false')
            span.q-mr-sm Collapse Data Feed
          q-btn.bg-dark.text-white(v-else icon-right='east' @click='isExpanded = true')
            span.q-mr-sm Expand Data Feed
        EssentialLink(v-for='link in essentialLinks' :key='link.title' v-bind='link')

  DataFeed(:isRightSidebarOpened='isRightSidebarOpened' :data='dataFeed.data')

  q-page-container
    slot
      router-view
</template>



<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import DataFeed from 'components/DataFeed.vue'
import {useDatafeedResponses} from '../stores/datafeed'
import PKG from '/package.json'
import { LocalStorage } from 'quasar'
import {inject, watch} from 'vue'

const $bus = inject('$bus')
const dataFeed = useDatafeedResponses()
const localData = LocalStorage.getItem('layout.base') || {}
const isLeftSidebarOpened = $ref(!!localData.isLeftSidebarOpened)
const isRightSidebarOpened = $ref(!!localData.isRightSidebarOpened)
const isExpanded = $ref(false)
const isRightExpanded = $ref(false)

$bus.on('layout.sidebar.right.resize', (isExpanded) => {
  isRightExpanded = isExpanded
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
    isRightSidebarOpened = true
  }
})




/**
 * Autosaves after toggling sidebar
 */
function toggleLeftSidebar () {
  isLeftSidebarOpened = !isLeftSidebarOpened
  $bus.emit('layout.sidebar.left.close', isLeftSidebarOpened)
  autosave()
}

function toggleRightSidebar () {
  isRightSidebarOpened = !isRightSidebarOpened
  $bus.emit('layout.sidebar.right.close', isRightSidebarOpened)
  autosave()
}

/**
 * Autosave
 */
function autosave () {
  LocalStorage.set('layout.base', {
    isLeftSidebarOpened: isLeftSidebarOpened,
    isRightSidebarOpened: isRightSidebarOpened
  })
}
</script>
