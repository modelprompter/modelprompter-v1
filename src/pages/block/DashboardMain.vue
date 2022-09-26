<template lang="pug">
q-card
  q-card-section
    q-table(v-if='settings.ui.sidebar.left.maximized' title='Workspaces' :rows='library.workspaces' :columns='columns' row-key='id' :grid="$q.screen.lt.lg")
      //- Add rows
      template(v-slot:top)
        q-btn(icon='library_add' label='Start a new Workspace' @click='addWorkspace')
      //- Rows with inline-edit
      template(v-slot:body='props')
        q-tr(:props='props')
          q-td(key='title' :props='props') {{ props.row.title }}
          q-td(key='description' :props='props') {{props.row.description}}
          q-td(key='actions' :props='props')
            .q-gutter-sm
              q-btn(icon='folder' color='orange' @click='openWorkspace(props)' label='Open')
              q-btn(icon='data_object' color='blue' @click='viewCode(props.row)' label='Code')
              q-btn(icon='fork_right' color='green' @click='remix(props.row)' label='Remix')
              q-btn(color='negative' icon='delete' @click='deleteWorkspace(props)')
      //- Responsive
      template(v-slot:item='props')
        .col-xs-12.col-sm-6.col-md-4.q-pa-xs
          q-card
            q-card-section
              div.text-h6 {{ props.row.title }}
            q-card-section
              div.text-body2 {{ props.row.description }}
            q-card-actions
              q-btn.full-width.q-mb-md(icon='folder' color='orange' @click='openWorkspace(props)' label='Open')
              q-btn.full-width.q-mb-md(color='blue' icon='data_object' @click='viewCode(props.row)')
              q-btn.full-width.q-mb-md(icon='fork_right' @click='remix(props.row)' label='Remix')
              q-btn.full-width.q-mb-md(color='negative' icon='delete' @click='deleteWorkspace(props)' label='Delete')
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

/**
 * View code
 */
function viewCode () {

}

/**
 * Creates a clone of this workspace
 * - No need to "open it" as we can just change the current workspace id
 */
function remix (row) {
  // Find workspace with current id
  const workspace = {...library.find(row.id)}
  workspace.id = uid()
  library.workspaces.push(workspace)
  library.$patch({currentWorkspace: {...workspace}})

  // Minimize sidebar
  settings.ui.sidebar.left.maximized = false
  $bus.emit('workspace.dashboard.main.reload', workspace)

  $q.notify({message: 'Workspace remixed and opened into'})
}

</script>
