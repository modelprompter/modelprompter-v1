<template lang="pug">
div(:class='{"mp-drawer-is-maximized": settings.ui.sidebar.left.maximized}')
  q-drawer.q-pt-md(v-model='settings.ui.sidebar.left.open' bordered show-if-above)
    q-list.q-px-md.q-pb-md.row.items-stretch
      .q-mb-md(:class='[settings.ui.sidebar.left.maximized ? "col-md-3 col-lg-2 col-xl-1 col-xs-12" : "col-12 col-xs-12"]')
        EssentialLink(v-for='link in essentialLinks' :key='link.title' v-bind='link')
        slot.q-mt-xl(name='dashboardSidebar')
          router-view(name='dashboardSidebar')
      .q-pa-md.q-pt-md.col-md-9.col-lg-10.colx-11.col-xs-12(v-if='settings.ui.sidebar.left.maximized')
        slot(name='dashboardMain')
          router-view(name='dashboardMain')
</template>

<script setup>
import {useSettingsStore} from '../stores/settings'
import EssentialLink from './EssentialLink.vue'

const settings = useSettingsStore()

const essentialLinks = $ref([
  {
    title: 'Quick Start',
    caption: 'Learn about Model Prompter',
    icon: 'auto_stories',
    link: '/',
  },
  {
    title: 'Workspace',
    caption: 'Use, remix, and edit blocks',
    icon: 'grid_4x4',
    link: '/workspace/',
  },
  {
    title: 'Library',
    caption: 'Local and community blocks',
    icon: 'extension',
    link: '/library',
  },
  {
    title: 'Blog',
    caption: 'Tutorials, news, and devlog',
    icon: 'rss_feed',
    link: '/blog',
  }
])

</script>
