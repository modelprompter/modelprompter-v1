<template lang="pug">
q-card.q-mt-md
  q-card-section
    div.text-h6 Workspace Settings
  q-space
  q-card-actions
    .col-4
      q-btn.full-width(color='blue' icon='data_object' @click='viewCode')
    .col-8.q-pl-xs
      q-btn.full-width(icon='save' @click='save' label='Save')
    q-input.col-12.q-mt-md(v-model='library.currentWorkspace.title' label='Title' dense)
    q-input.col-12.q-mt-md(type='textarea' autogrow v-model='library.currentWorkspace.description' label='Description' dense)

  q-dialog
    q-card.q-dialog-plugin
      q-card-actions(align='right')
        q-btn(icon='close' flat round dense @click='close')
</template>

<script setup>
import {useLibraryStore} from 'stores/library'
import {inject} from 'vue'
import {uid, useQuasar} from 'quasar'
import CodeIO from 'src/pages/workspace/CodeIO.vue'

const $q = useQuasar()
const $bus = inject('$bus')
const library = useLibraryStore()

function save () {
  $bus.emit('dashboard.sidebar.save')
  $q.notify({message: 'Workspace saved'})
}

function viewCode () {
  $q.dialog({
    component: CodeIO,
    componentProps: {
      title: 'Import blocks into current workspace or export them',
      exportMessage: 'Copy the code below to paste this workspace into another. You can also download the .json file for sharing or backup.',
      importMessage: 'Paste the code below or import a JSON file to import those blocks into this workspace.',
      workspaces: JSON.stringify(library.workspaces),
      currentWorkspace: JSON.stringify([library.currentWorkspace])
    }
  })
}
</script>
