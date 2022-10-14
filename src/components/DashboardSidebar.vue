<template lang="pug">
div(:class='{"mp-drawer-is-maximized": settings.ui.sidebar.left.maximized}')
  q-drawer(v-model='settings.ui.sidebar.left.open' bordered)
    q-list.q-px-md.q-pb-md.row.items-stretch
      .q-mb-md(:class='[settings.ui.sidebar.left.maximized ? "col-md-3 col-lg-2 col-xl-1 col-xs-12" : "col-12 col-xs-12"]')
        q-item-label.q-px-none(header)
          q-btn.full-width.bg-dark.text-white(color='light' v-if='settings.ui.sidebar.left.maximized' icon-right='first_page' @click='settings.ui.sidebar.left.maximized = false')
            span.q-mr-sm Close Dashboard
          q-btn.full-width.bg-dark.text-white(color='light' v-else icon-right='last_page' @click='settings.ui.sidebar.left.maximized = true')
            span.q-mr-sm Open Dashboard

        EssentialLink.q-mb-xl(v-for='link in essentialLinks' :key='link.title' v-bind='link')
        slot(name='dashboardSidebar')
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
  // {
  //   title: 'Quick Prompter',
  //   caption: 'Ask a model for something',
  //   icon: 'space_bar',
  //   link: '/quick',
  // },
  {
    title: 'Blocks',
    caption: 'Automate APIs with blocks',
    icon: 'extension',
    link: '/block/1b8c46a7-145a-4d23-b076-4d8538afe220',
  }
])

</script>
