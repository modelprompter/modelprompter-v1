<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='toggleLeftDrawer')
      q-toolbar-title
        span
          router-link.text-decoration-none.text-white(:to='{path: "/"}')
            img.gt-sm.q-mr-sm(src='/src/assets/logo-title.png' height=32 style='vertical-align: middle')
            img.lt-md.q-mr-sm(src='/src/assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
          a(href='https://github.com/modelprompter/modelprompter/releases' target='_blank')
            small.gt-xs.q-ml-sm(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{pkg.version}}
      router-view(name='toolbar')

  q-drawer(v-model='leftDrawerClosed' bordered)
    q-list
      q-item-label(header) Site navigation
      EssentialLink(v-for='link in essentialLinks' :key='link.title' v-bind='link')

  q-page-container
    slot
      router-view
</template>



<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import pkg from '/package.json'
import { LocalStorage } from 'quasar'



const linksList = [
  {
    title: 'Quick Prompter',
    caption: 'Ask a model for something',
    icon: 'space_bar',
    link: '/quick',
  },
  {
    title: 'Block Prompter',
    caption: 'Ask a model for something',
    icon: 'extension',
    link: '/block',
  }
]



export default defineComponent({
  name: 'BaseLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const localData = LocalStorage.getItem('layout.base') || {}
    const leftDrawerClosed = ref(!!localData.leftDrawerClosed)

    return {
      essentialLinks: linksList,
      leftDrawerClosed,
      toggleLeftDrawer() {
        leftDrawerClosed.value = !leftDrawerClosed.value
        LocalStorage.set('layout.base', {
          leftDrawerClosed: leftDrawerClosed.value
        })
      },
      pkg
    }
  },
})
</script>
