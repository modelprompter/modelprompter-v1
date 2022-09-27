<template lang="pug">
q-dialog(ref='dialogRef')
  q-card.q-dialog-plugin
    q-card-section
      p.text-h6 Import/Export Workspaces
      p
        strong What would you like to do?
      q-radio(v-model='mode' val='Export' label='Export')
      q-radio(v-model='mode' val='Import' label='Import')

    //- Exports
    q-card-section(v-if='mode === "Export"')
      p Copy the code below to paste this workspace into another. You can also download the .json file for sharing or backup.
      q-input(v-model='exportCode' type='textarea' label='Code to export')
    //- Imports
    q-card-section(v-else)
      p Paste the code below or import it into another library, or download a timestamped file for backup.
      q-input(v-model='importCode' type='textarea' label='Paste your code to import here')

    //- Footer actions
    q-card-actions(align='right')
      q-file.hidden(ref='$jsonFile' v-model='jsonFile' @update:model-value='updatedFile')
      template(v-if='mode === "Export"')
        q-btn(@click='downloadJSON' label='Download .json')
      template(v-if='mode === "Import"')
        q-btn(color='light' @click='importCodeString' label='Import code from text' :disabled='!importCode')
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
const props = defineProps(['workspaces', 'currentWorkspace'])
const $bus = inject('$bus')

const library = useLibraryStore()
const settings = useSettingsStore()

const mode = $ref('Export')
const scope = $ref('workspace')
const step = $ref(0)
const importCode = $ref('')
const $jsonFile = ref()
const jsonFile = $ref([])
const $q = useQuasar()

/**
 * Downloads a json file
 */
function downloadJSON () {
  const title = scope === 'workspace' ? library.currentWorkspace.title : 'library'
  const date = new Date()
    .getFullYear()
      + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)
      + '-' + ('0' + new Date().getDate()).slice(-2)

  fileDownload(exportCode, `${date}-${title}-modelprompter.json`)
  onDialogOK()
}

/**
 * Displays the export code
 */
const exportCode = $computed(() => {
  if (mode === 'Export') {
    if (scope === 'workspace') {
      return props.currentWorkspace
    } else {
      return props.workspaces
    }
  }
})

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
