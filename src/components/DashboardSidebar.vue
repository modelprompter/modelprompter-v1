<template lang="pug">
div(:class='{"mp-drawer-is-maximized": settings.ui.sidebar.left.maximized}')
  q-drawer(v-model='settings.ui.sidebar.left.open' bordered)
    q-list
      q-item-label(header align='right')
        q-btn.bg-dark.text-white(v-if='settings.ui.sidebar.left.maximized' icon-right='west' @click='settings.ui.sidebar.left.maximized = false')
          span.q-mr-sm Collapse Dashboard
        q-btn.bg-dark.text-white(v-else icon-right='east' @click='settings.ui.sidebar.left.maximized = true')
          span.q-mr-sm Expand Dashboard
      .q-px-md.q-pb-md
        .row
          .q-pa-xs.q-mb-md(:class='[settings.ui.sidebar.left.maximized ? "col-md-3 col-lg-2 col-xl-1 col-xs-12" : "col-12 col-xs-12"]')
            EssentialLink.q-mb-xl(v-for='link in essentialLinks' :key='link.title' v-bind='link')
            slot(name='dashboardSidebar')
              router-view(name='dashboardSidebar')
          .q-pa-xs.col-md-9.col-lg-10.colx-11.col-xs-12(v-if='settings.ui.sidebar.left.maximized')
            slot(name='dashboardMain')
              router-view(name='dashboardMain')
</template>

<script setup>
import {useSettingsStore} from '../stores/settings'
import EssentialLink from './EssentialLink.vue'

const settings = useSettingsStore()

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

</script>
