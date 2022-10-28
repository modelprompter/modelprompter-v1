<template lang="pug">
.blockly-form(v-if='props.isFormVisible')
  .q-pa-md
    q-card
      q-card-section.bg-blue.q-pb-xs(v-if='Object.keys(props.formData).length')
        p(v-for='(field, key) in props.formData' :key='key')
          q-input.bg-light(v-if='field.type === "text"' stack-label outlined v-model='field.value' :label='field.label')
      q-card-section.bg-dark(v-else)
        div <strong>No form fields</strong>
        div Right click on a block to add it to the form below
</template>

<script setup>
import {onMounted, onUnmounted, watch, inject, computed} from 'vue'
import {throttle} from 'lodash-es'
import {useLibraryStore} from 'stores/library'

const library = useLibraryStore()
const $bus = inject('$bus')
const props = defineProps(['workspaceID', 'workspaceData', 'formData', 'blockDB', 'isFormVisible'])
const emit = defineEmits(['updateField'])

/**
 * Watchers
 */
// Update form fields from workspace
watch(() => props.workspaceData, workspace => {
  const blocks = workspace?.blocks?.blocks || []

  if (blocks?.length) {
    props.blockDB && Object.keys(props.blockDB).forEach(key => {
      const block = props.blockDB[key]

      if (props.formData[block.id]) {
        let input = props.blockDB[block.id].inputList[0].fieldRow.find(field => field.name)
        props.formData[block.id].value = input.getValue()
      }
    })
  }
}, {deep: true})

// Update workspace from form fields
watch(() => props.formData, form => {
  let blocks = []
  props.blockDB && Object.keys(props.blockDB)?.forEach(key => blocks.push(props.blockDB[key]))

  // @todo Just update the block that changed
  blocks.forEach((block, key) => {
    if (form[block.id]) {
      let input = props.blockDB[block.id].inputList[0].fieldRow.find(field => field.name)
      input.setValue(form[block.id].value)
    }
  })
}, {deep: true})

// Remove missing fields
watch(() => props.isFormVisible, removeMissingFields)

/**
 * Listeners
 */
onMounted(() => {
  $bus.on('workspace.block.addToForm', onAddBlockToForm)
  removeMissingFields()
})
onUnmounted(() => {
  $bus.off('workspace.block.addToForm', onAddBlockToForm)
})

/**
 * Removes missing fields
 */
function removeMissingFields () {
  setTimeout(() => {
    props.formData && props.blockDB && Object.keys(props.formData).forEach(key => {
      let blocks = []
      Object.keys(props.blockDB)?.forEach(key => blocks.push(props.blockDB[key]))

      let found = false
      blocks.some((block, idx) => {
        if (block.id === key && block.inputList?.length) {
          return found = true
        }
      })

      if (!found) {
        delete props.formData[key]
      }
    })
  }, 0)
}

/**
 * Add block to form
 */
const onAddBlockToForm = (block, workspaceID) => {
  if (props.workspaceID !== workspaceID) return

  props.formData[block.id] = props.formData[block.id] || {}
  props.formData[block.id].type = block.type
  props.formData[block.id].label = props.formData[block.id].label || block.type

  // Remove missing fields and set value
  Object.keys(props.formData).forEach(key => {
    let blocks = []
    props.blockDB && Object.keys(props.blockDB)?.forEach(key => blocks.push(props.blockDB[key]))

    // Set initial field value
    blocks.some((block, idx) => {
      if (block.id === key && block.inputList?.length) {
        let input = block.inputList[0].fieldRow.find(field => field.name)
        props.formData[key].value = input.getValue()

        return true
      }
    })
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
