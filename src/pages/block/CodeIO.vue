<template lang="pug">
q-dialog(ref='dialogRef')
  q-card.q-dialog-plugin
    q-card-section
      p.text-h6 {{props.title}}
      p
        strong What would you like to do?
      q-radio(v-model='mode' val='Export' label='Export')
      q-radio(v-model='mode' val='Import' label='Import')

    //- Exports
    q-card-section(v-if='mode === "Export"')
      p {{props.exportMessage}}
      q-input(v-model='props.currentWorkspace' filled type='textarea' label='Code to export')
    //- Imports
    q-card-section(v-else)
      p {{props.importMessage}}
      q-input(v-model='importCode' filled type='textarea' label='Paste your code to import here')

    //- Footer actions
    q-card-actions(align='right')
      q-file.hidden(ref='$jsonFile' v-model='jsonFile' @update:model-value='updatedFile')
      template(v-if='mode === "Export"')
        q-btn(@click='downloadJSON' label='Download .json')
      template(v-if='mode === "Import"')
        q-btn(color='light' @click='importCodeString' label='Import code from textarea' :disabled='!importCode')
        q-space
        q-btn(@click='importJSON' label='Import .json File')
</template>

<script setup>
import fileDownload from 'js-file-download'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { useLibraryStore } from 'stores/library'
import { useSettingsStore } from 'src/stores/settings'
import {ref, nextTick, inject} from 'vue'

const {dialogRef, onDialogOK, onDialogCancel} = useDialogPluginComponent()
const props = defineProps(['workspaces', 'currentWorkspace', 'title', 'importMessage', 'exportMessage'])
const $bus = inject('$bus')

const library = useLibraryStore()
const settings = useSettingsStore()

const mode = $ref('Export')
const step = $ref(0)
const importCode = $ref('')
const $jsonFile = ref()
const jsonFile = $ref([])
const $q = useQuasar()

/**
 * Downloads a json file
 */
function downloadJSON () {
  const title = library.currentWorkspace.title
  const date = new Date()
    .getFullYear()
      + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)
      + '-' + ('0' + new Date().getDate()).slice(-2)

  fileDownload(props.currentWorkspace, `${date}-${title}-modelprompter.json`)
  onDialogOK()
}

/**
 * Imports a json file
 */
function importJSON (ev) {
  nextTick(ev => {
    $jsonFile.value.pickFiles(ev)
  })
}

function updatedFile (file) {
  if (file) {
    try {
      file.text()
        .then(workspaces => {
          // Add the workspace
          // workspaces = JSON.parse(workspaces)
          // if (importMethod === 'replace') {
          //   library.$patch({workspaces})
          // } else {
          //   workspaces.forEach((workspace, n) => {
          //     const id = library.findIndex(workspace.id)
          //     if (id > -1) {
          //       library.workspaces[id] = workspace
          //     } else {
          //       library.workspaces.push(workspace)
          //     }
          //   })
          // }
          workspaces = JSON.parse(workspaces)

          // Load the workspace
          settings.ui.sidebar.left.maximized = false
          workspaces.forEach(workspace => {
            $bus.emit('workspace.dashboard.main.reload', workspace, {}, false)
          })

          $q.notify({
            message: 'Imported successfully',
            icon: 'check'
          })
          onDialogOK()
        })
        .catch(err => {
          $q.notify({
            type: 'negative',
            message: 'Error importing file: ' + err,
            timeout: 3000
          })
        })
    } catch (err) {
      $q.notify({
        type: 'negative',
        message: 'Error importing file: ' + err,
        timeout: 3000
      })
    }
  }
}

/**
 * Import from the code textbox
 */
function importCodeString () {
  const $importCode = JSON.parse(importCode)
  // if (importMethod === 'replace') {
  //   library.$patch({workspaces: $importCode})
  // } else {
  //   $importCode.forEach((workspace, n) => {
  //     const id = library.findIndex(workspace.id)
  //     if (id > -1) {
  //       library.workspaces[id] = workspace
  //     } else {
  //       library.workspaces.push(workspace)
  //     }
  //   })
  // }

  // Load into the workspace
  settings.ui.sidebar.left.maximized = false
  $importCode.forEach(workspace => {
    $bus.emit('workspace.dashboard.main.reload', workspace, {}, false)
  })

  $q.notify({
    message: 'Imported successfully',
    icon: 'check'
  })
  onDialogOK()
}
</script>
