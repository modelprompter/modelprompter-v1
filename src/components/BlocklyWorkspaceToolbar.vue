<template lang="pug">
q-bar(style='position: relative; z-index: 100')
  div.text-ellipse
    router-link(:to='{name: "workspace-detail", params: {id: props.workspaceID}}' style="text-decoration: none; font-weight: bold;" @click='toggleFullscreen(false)') {{props.title}}
  q-space
  q-btn.q-mr-md.text-yellow(dense flat :icon='props.isFormVisible ? "extension" : "text_fields"' @click='$emit("formToggled")')
  q-btn.text-yellow(v-if='!props.hideFullscreenToggle' dense flat icon='open_in_full' @click='toggleFullscreen')
</template>

<script setup>
const props = defineProps(['title', 'workspaceID', 'hideFullscreenToggle', 'isFullscreen', 'isFormVisible'])
const emit = defineEmits(['formToggled', 'fullscreenToggled'])

const toggleFullscreen = (stateToToggleTo) => {
  const state = typeof stateToToggleTo === 'boolean' ? stateToToggleTo : !props.isFullscreen
  emit('fullscreenToggled', state)
}
</script>
