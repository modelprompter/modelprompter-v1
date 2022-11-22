<template lang="pug">
q-page
  .content(style='position: absolute; top: 0; bottom: 0; left: 0; right: 0;')
    iframe(:src='"https://blog.modelprompter.com/" + path' style='min-height: inherit; width: 100%; height: 100%; border: none;')
</template>

<script setup>
import {useRoute} from 'vue-router'

const $route = useRoute()
const path = $ref($route.params.catchAll ? $route.params.catchAll.join('/') : '')
</script>}
