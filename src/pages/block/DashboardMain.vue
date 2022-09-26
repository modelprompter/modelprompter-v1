<template lang="pug">
q-card
  q-card-section
    q-table(v-if='settings.ui.sidebar.left.maximized' title='Workspaces' :rows='library.workspaces' :columns='columns' row-key='id' :grid="$q.screen.lt.md")
      //- Add rows
      template(v-slot:top)
        q-btn(icon='library_add' label='Start a new Workspace' @click='addWorkspace')
      //- Rows with inline-edit
      template(v-slot:body='props')
        q-tr(:props='props')
          q-td(key='title' :props='props') {{ props.row.title }}
          q-td(key='description' :props='props') {{props.row.description}}
          q-td(key='actions' :props='props')
            .row
              .col-8.q-pr-md
                q-btn.full-width(icon='delete' @click='openWorkspace(props)' label='Open')
              .col-4
                q-btn.full-width(color='negative' icon='delete' @click='deleteWorkspace(props)')
      //- Responsive
      template(v-slot:item='props')
        .q-pa-md
          .col-xs-12.col-sm-6.col-md-4
            q-card
</template>

<script setup>
import {useLibraryStore} from 'stores/library'
import {useQuasar, uid} from 'quasar'
import {useSettingsStore} from 'stores/settings'
import {inject} from 'vue'

const $bus = inject('$bus')
const $q = useQuasar()
const settings = useSettingsStore()
const columns = $ref([
  { name: 'title', align: 'left', field: 'title', label: 'Title' },
  { name: 'description', align: 'left', field: 'description', label: 'Description' },
  { name: 'actions', align: 'left', field: 'actions', label: 'Actions'},
])
const library = useLibraryStore()

/**
 * Delete workspace
 */
function deleteWorkspace (props) {
  $q.dialog({
    title: 'Delete Workspace',
    message: 'Are you sure you want to delete this workspace?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // Get index of workspace with id
    const index = library.workspaces.findIndex(workspace => workspace.id === props.row.id)
    library.workspaces.splice(index, 1)
    $q.notify({message: 'Workspace deleted'})
  })
}

/**
 * Opens the workspace
 */
function openWorkspace (props) {
  $q.dialog({
    title: 'Open Workspace',
    message: 'Are you sure you want to open this workspace? Any changes will be lost.',
    cancel: true,
    persistent: true
  }).onOk(() => {
    settings.ui.sidebar.left.maximized = false
    library.$patch({currentWorkspace: {...library.find(props.row.id)}})
    $bus.emit('workspace.dashboard.main.reload', props.row)
    $q.notify({message: 'Workspace opened'})
  })
}

/**
 * Add new workspace
 */
function addWorkspace () {
  library.workspaces.push({
    title: 'Untitled',
    id: uid(),
  })
}

</script>
