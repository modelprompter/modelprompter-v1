<template lang="pug">
q-page
  .content(style='position: absolute; top: 0; bottom: 0; left: 0; right: 0;')
    q-linear-progress(v-if='isLoading' indeterminate)
    iframe(ref='$iframe' :src='"https://blog.modelprompter.com/" + path' style='min-height: inherit; width: 100%; height: 100%; border: none;')
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {onMounted, onUnmounted} from 'vue'

const $route = useRoute()
const $router = useRouter()
const path = $ref($route.params.catchAll ? $route.params.catchAll.join('/') : '')
const isLoading = $ref(true)
const $iframe = $ref(null)

onMounted(() => {
  window.addEventListener('message', onMessage)

  $iframe.onload = () => {
    setTimeout(() => {
      isLoading = false
    }, 500)
  }
})
onUnmounted(() => {
  window.removeEventListener('message', onMessage)
})

function onMessage(ev) {
  if (ev.origin === 'https://blog.modelprompter.com') {
    if (ev.data.type === 'navigation') {
      const url = new URL(ev.data.url)
      let path = url.pathname.replace('/modelprompter/', '')
      $router.push(`/blog/${path}`)
      console.log('onMessage', path)
    }
  }
}
</script>}
