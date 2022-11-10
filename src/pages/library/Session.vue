<template lang="pug">
q-table(title='Workspaces' :rows='library.workspaces' :columns='columns' row-key='id' :grid="$q.screen.lt.lg" :rows-per-page-options='[10, 25, 50, 0]')
  //- Add rows
  template(v-slot:top)
    q-btn.gt-sm(icon='library_add' color='green' label='New Workspace' @click='addWorkspace')
    q-space.gt-sm
    q-btn.gt-sm(icon='data_object' color='blue' label='Import/Export Library' @click='viewLibraryCode')

    .row.flex
      q-btn.lt-md.full-width(icon='data_object' color='blue' label='Import/Export Library' @click='viewLibraryCode')
      q-btn.lt-md.full-width(icon='library_add' color='green' label='Create New Workspace' @click='addWorkspace')
  //- Rows with inline-edit
  template(v-slot:body='props')
    q-tr(:props='props')
      q-td(key='title' :props='props') {{ props.row.title }}
      q-td(key='description' :props='props') {{props.row.description}}
      q-td(key='actions' :props='props')
        .q-gutter-sm
          q-btn-group
            q-btn(icon='folder' @click='openWorkspace(props)' label='Open')
            q-btn(icon='data_object' color='blue' @click='viewCode(props.row)' label='Code')
            q-btn(icon='fork_right' color='orange' @click='remix(props.row)' label='Remix')
            q-btn(color='negative' icon='delete' @click='deleteWorkspace(props)' label='Delete')
  //- Responsive
  template(v-slot:item='props')
    .col-xs-12.col-sm-6.col-md-4.q-pa-xs
      q-card
        q-card-section
          div.text-h6 {{ props.row.title }}
        q-card-section
          div.text-body2 {{ props.row.description }}
        q-card-section
          q-btn-group.full-width
            q-btn(color='negative' icon='delete' @click='deleteWorkspace(props)' label='Delete')
            q-btn(icon='fork_right' color='orange' @click='remix(props.row)' label='Remix')
            q-btn(color='blue' icon='data_object' @click='viewCode(props.row)' label='Code')
            q-btn(icon='folder' @click='openWorkspace(props)' label='Open')
</template>

<script setup>
import {useLibraryStore} from 'stores/library'
import {useQuasar, uid} from 'quasar'
import {useSettingsStore} from 'stores/settings'
import {useRouter} from 'vue-router'
import {inject, onMounted} from 'vue'
import CodeIO from 'src/pages/workspace/CodeIO.vue'
import LibrarySession from 'src/pages/library/Session.vue'

const $router = useRouter()
const $bus = inject('$bus')
const $q = useQuasar()
const settings = useSettingsStore()
const columns = $ref([
  { name: 'title', align: 'left', field: 'title', label: 'Title' },
  { name: 'description', align: 'left', field: 'description', label: 'Description' },
  { name: 'actions', align: 'left', field: 'actions', label: 'Actions'},
])
const library = useLibraryStore()
const tab = $ref('session')

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

    if (library.currentWorkspace.id === props.row.id) {
      library.$patch({currentWorkspace: {}})
      $bus.emit('workspace.reload', {id: props.row.id}, true)
      $q.notify({message: 'Active workspace deleted'})
    } else {
      $q.notify({message: 'Workspace deleted'})
    }
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
    library.$patch({currentWorkspace: {...library.find(props.row.id)}})
    $router.push({name: 'workspace', params: {id: props.row.id}})
    $bus.emit('workspace.reload', props.row, true)
    $q.notify({message: 'Workspace opened'})
  })
}

/**
 * Add new workspace
 */
function addWorkspace () {
  const id = uid()
  const workspace = {
    id,
    title: 'New Workspace',
    description: '',
    workspace: '',
    viewLeft: 0,
    viewTop: 0,
    scale: 1
  }

  library.workspaces.push(workspace)
  library.$patch({currentWorkspace: {...workspace}})

  $router.push({name: 'workspace', params: {id}})
  $bus.emit('workspace.reload', workspace, true)
  $q.notify({message: 'New workspace added and loaded into'})
}

/**
 * View code
 */
function viewCode (row) {
  $q.dialog({
    component: CodeIO,
    componentProps: {
      workspaces: JSON.stringify(library.workspaces),
      currentWorkspace: JSON.stringify([row]),
      title: 'Export workspace',
      exportMessage: 'Copy the code below to paste this workspace into another. You can also download the .json file for sharing or backup.',
      excludeImport: true,
    }
  })
}

/**
 * Creates a clone of this workspace
 * - No need to "open it" as we can just change the current workspace id
 */
function remix (row) {
  // Find workspace with current id
  const workspace = {...library.find(row.id)}
  workspace.id = uid()
  workspace.title += ' (remix)'
  library.workspaces.push(workspace)
  library.$patch({currentWorkspace: {...workspace}})

  // Navigate to new workspace
  $router.push({name: 'workspace', params: {id: row.id}})
  $bus.emit('workspace.reload', workspace, true)
  $q.notify({message: 'Workspace remixed and opened into'})
}

/**
 * Work with entire library
 */
function viewLibraryCode () {
  $q.dialog({
    component: CodeIO,
    componentProps: {
      isLibrary: true,
      currentWorkspace: JSON.stringify(library.workspaces),
      title: 'Import or Export an entire library',
      exportMessage: 'Copy the code below or download the JSON and import it into another Library. You can also use this to later import all blocks across this entire Library into a single Workspace.',
    }
  })
}
</script>
