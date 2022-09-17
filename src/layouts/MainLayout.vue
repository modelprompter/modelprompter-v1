<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated='')
    q-toolbar
      q-btn(flat='' dense='' round='' icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
      q-toolbar-title
        span
          router-link.text-decoration-none.text-white(:to='{path: "/"}')
            img.gt-sm.q-mr-sm(src='/src/assets/logo-title.png' height=32 style='vertical-align: middle')
            img.lt-md.q-mr-sm(src='/src/assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
          a(href='https://github.com/modelprompter/modelprompter/releases' target='_blank')
            small.gt-xs.q-ml-sm(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{pkg.version}}

  q-drawer(v-model='leftDrawerOpen' show-if-above='' bordered='')
    q-list
      q-item-label(header='') Site navigation
      EssentialLink(v-for='link in essentialLinks' :key='link.title' v-bind='link')

  q-page-container
    router-view
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import pkg from '/package.json'

const linksList = [
  {
    title: 'Quick Prompter',
    caption: 'Ask a model for something',
    icon: 'space_bar',
    link: '/quick',
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      pkg
    }
  },
})
</script>
