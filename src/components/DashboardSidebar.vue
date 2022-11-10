<template lang="pug">
div(:class='{"mp-drawer-is-maximized": settings.ui.sidebar.left.maximized}')
  q-drawer.q-pt-md(v-model='settings.ui.sidebar.left.open' bordered)
    q-list.q-px-md.q-pb-md.row.items-stretch
      .q-mb-md(:class='[settings.ui.sidebar.left.maximized ? "col-md-3 col-lg-2 col-xl-1 col-xs-12" : "col-12 col-xs-12"]')
        template(v-for='(link, key)  in essentialLinks' :key='key')
          q-item(clickable tag='a' :to='link.to' :href='link.href' :target='link.href ? "_blank" : null')
            q-item-section(v-if='link.icon' avatar)
              q-icon(:name='link.icon')
            q-item-section
              q-item-label {{ link.title }}
              q-item-label(caption) {{ link.caption }}

        slot.q-mt-xl(name='dashboardSidebar')
          router-view(name='dashboardSidebar')
      //- .q-pa-md.q-pt-md.col-md-9.col-lg-10.colx-11.col-xs-12
      //-   slot(name='dashboardMain')
      //-     router-view(name='dashboardMain')
</template>

<script setup>
import {useSettingsStore} from '../stores/settings'

const settings = useSettingsStore()
const essentialLinks = $ref([
  {
    title: 'Documentation',
    caption: 'Learn about Model Prompting',
    icon: 'auto_stories',
    to: '/',
  },
  {
    title: 'Workspace',
    caption: 'Use and edit blocks and forms',
    icon: 'grid_4x4',
    to: '/workspace/',
  },
  {
    title: 'Library',
    caption: 'Manage workspaces',
    icon: 'extension',
    to: '/library',
  },
  {
    title: 'Blog',
    caption: 'Tutorials, news, and devlog',
    icon: 'rss_feed',
    href: 'https://modelprompter.notion.site/Model-Prompter-0d1872f91470464189abc4386074965c',
  }
])

</script>
