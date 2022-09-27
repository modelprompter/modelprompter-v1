<template lang="pug">
q-dialog(ref='dialogRef')
  q-card.q-dialog-plugin
    q-card-section
      div.text-h6 Import and Export Workspaces

    q-stepper(v-model='step' animated header-nav)
      //- Setup
      q-step(:name='0' title='Setup' icon='settings')
        q-card-section
          p
            strong What would you like to do?
          q-radio(v-model='mode' val='Export' label='Export')
          q-radio(v-model='mode' val='Import' label='Import')
        q-card-section
          p
            strong {{mode}} what?
          q-radio(v-model='scope' val='workspace' label='This Workspace')
          q-radio(v-model='scope' val='library' label='Complete Library')
        q-card-section(v-if='mode === "Import"')
          p
            strong How would you like to {{mode}}?
          q-radio(v-model='importMethod' val='merge' label='Merge with existing')
          q-radio(v-model='importMethod' val='replace' label='Discard current and use import')

      //- Code
      q-step(:name='1' title='Code' icon='code')
        q-card-section(v-if='mode === "Export"')
          p Copy the code below to share or import it into another library.
          //- Exports
          q-input(v-model='exportCode' type='textarea' label='Code')

    //- Footer actions
    q-card-actions(align='right')
      q-btn(color='transparent' @click='onDialogCancel' label='Cancel')
      q-space
      q-btn(@click='nextPage' label='Next' )
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { useLibraryStore } from 'stores/library'
import {ref} from 'vue'

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()
const props = defineProps(['workspaces', 'currentWorkspace'])

const library = useLibraryStore()
const mode = ref('Export')
const scope = ref('workspace')
const importMethod = ref('merge')
const step = ref(0)

function nextPage () {
  step.value = 'code'
}

const exportCode = $computed(() => {
  if (mode.value === 'Export') {
    if (scope.value === 'workspace') {
      return props.currentWorkspace
    } else {
      return props.workspaces
    }
  }
})
</script>
