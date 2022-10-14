<template lang="pug">
q-page
  BlocklyWorkspace(:workspaceID='$route.params.id' :isMain='true' :hideFullscreenToggle='true')
</template>

<script setup>
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import {onMounted, watch, ref, inject, nextTick} from 'vue'
import {uid} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {useLibraryStore} from 'stores/library'

const library = useLibraryStore()
const $router = useRouter()
const $route = useRoute()
const $bus = inject('$bus')

/**
 * Loads the current workspace or the one with ID
 */
onMounted(() => {
  if (!$route.params.id && library.currentWorkspace.id) {
    $router.push({name: 'active-block', params: {id: library.currentWorkspace.id}})
    nextTick(() => {
      $bus.emit('workspace.dashboard.main.reload', library.currentWorkspace, {
        viewLeft: library.currentWorkspace.viewLeft,
        viewTop: library.currentWorkspace.viewTop,
        scale: library.currentWorkspace.scale,
      }, true)
    })
  } else if (!$route.params.id) {
    library.currentWorkspace.id = uid()
    $router.push({name: 'active-block', params: {id: library.currentWorkspace.id}})
  }
})
</script>
