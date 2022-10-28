<template lang="pug">
q-bar(style='position: relative; z-index: 100')
  div.text-ellipse
    router-link(:to='{name: "workspace-detail", params: {id: props.workspaceID}}' style="text-decoration: none; font-weight: bold;" @click='toggleFullscreen(false)') {{props.title}}
  //- .cursor-pointer.non-selectable
  //-   | File
  //-   q-menu
  //-     q-list(dense style='min-width: 100px')
  //-       q-item(clickable v-close-popup)
  //-         q-item-section Open...
  //-       q-item(clickable v-close-popup)
  //-         q-item-section New
  //-       q-separator
  //-         q-item(clickable)
  //-           q-item-section Preferences
  //-           q-item-section(side)
  //-             q-icon(name='keyboard_arrow_right')
  //-           q-menu(anchor='top end' self='top start')
  //-             q-list
  //-               q-item(v-for='n in 3' :key='n' dense clickable)
  //-                 q-item-section Submenu Label
  //-                 q-item-section(side)
  //-                   q-icon(name='keyboard_arrow_right')
  //-                 q-menu(auto-close anchor='top end' self='top start')
  //-                   q-list
  //-                     q-item(v-for='n in 3' :key='n' dense clickable)
  //-                       q-item-section 3rd level Label
  //-         q-separator
  //-           q-item(clickable v-close-popup)
  //-             q-item-section Quit

  //- q-space
  //- BlocklyToggle
  q-space
  q-btn.q-mr-md.text-yellow(dense flat :icon='props.isFormVisible ? "extension" : "text_fields"' @click='$emit("formToggled")')
  q-btn.text-yellow(v-if='!props.hideFullscreenToggle' dense flat icon='open_in_full' @click='toggleFullscreen')
</template>

<script setup>
import BlocklyToggle from 'components/BlocklyToggle.vue'

const props = defineProps(['title', 'workspaceID', 'hideFullscreenToggle', 'isFullscreen', 'isFormVisible'])
const emit = defineEmits(['formToggled', 'fullscreenToggled'])

const toggleFullscreen = (stateToToggleTo) => {
  const state = typeof stateToToggleTo === 'boolean' ? stateToToggleTo : !props.isFullscreen
  emit('fullscreenToggled', state)
}
</script>
