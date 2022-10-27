<template lang="pug">
.blockly-form(v-if='props.isFormVisible')
  .q-pa-md
    q-card
      q-card-section(v-for='(field, key) in form' :key='key')
        q-input(v-if='field.type === "text"' stack-label filled v-model='field.value' :label='field.label')
        //- div.row.q-col-gutter-md(v-for='(field, key) in form' :key='key')
        //-   .col-xs-12.col-md-3
        //-     //- q-input(v-if='field.type === "text"' filled label='label' v-model='field.label')
        //-   .col-xs-12.col-md-9
</template>

<script setup>
import {onMounted, onUnmounted, watch, inject, computed} from 'vue'
import {throttle} from 'lodash-es'
import {useLibraryStore} from 'stores/library'

const library = useLibraryStore()
const $bus = inject('$bus')
const props = defineProps(['workspaceID', 'workspace', 'isFormVisible', 'static'])

/**
 * Computed
 */
const form = computed(() => {
  if (props.static) {
    return library.workspaces[props.workspaceID]?.form || {}
  }
  return library.currentWorkspace?.form || {}
})

const workspaceData = computed(() => {
  if (props.static) {
    return library.workspaces[props.workspaceID].workspace?.blocks?.blocks || []
  }
  return library.currentWorkspace.workspace?.blocks?.blocks || []
})

/**
 * Watchers
 */
// Update form fields from workspace
watch(() => workspaceData, blocks => {
  if (!props.static && blocks.value) {
    blocks.value.forEach(block => {
      if (library.currentWorkspace?.form?.[block.id]) {
        const key = Object.keys(block.fields)[0]
        library.currentWorkspace.form[block.id].value = block.fields[key]
      }
    })
  }
}, {deep: true})

/**
 * Listeners
 */
onMounted(() => {
  $bus.on('workspace.block.addToForm', onAddBlockToForm)
})
onUnmounted(() => {
  $bus.off('workspace.block.addToForm', onAddBlockToForm)
})

/**
 * Add block to form
 */
const onAddBlockToForm = (block) => {
  if (props.static) return

  library.currentWorkspace.form = library.currentWorkspace.form || {}
  library.currentWorkspace.form[block.id] = library.currentWorkspace.form[block.id] || {}
  library.currentWorkspace.form[block.id].type = block.type
  library.currentWorkspace.form[block.id].label = library.currentWorkspace.form[block.id].label || block.type

  // Remove missing fields and set value
  Object.keys(library.currentWorkspace.form).forEach(key => {
    let found = false

    // Set initial field value
    library.currentWorkspace?.workspace?.blocks?.blocks?.some((block, idx) => {
      if (block.id === key) {
        let fieldKey = Object.keys(library.currentWorkspace.workspace.blocks.blocks[idx].fields)[0]
        library.currentWorkspace.form[key].value = library.currentWorkspace.workspace.blocks.blocks[idx].fields[fieldKey]
        found = true
      }
      return found
    })

    if (!found) {
      delete library.currentWorkspace.form[key]
    }
  })
}

</script>

<style lang="sass">
.blockly-form
  position: absolute
  top: $toolbar-min-height - 18px
  left: 0
  right: 0
  bottom: 0
  z-index: 1000
  background: $light
  overflow: auto

.fullscreen .blockly-form
  top: $toolbar-min-height - 18px + 50px
</style>
