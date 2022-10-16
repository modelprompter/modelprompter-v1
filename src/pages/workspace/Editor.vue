<template lang="pug">
q-page
  .content
    .row.q-col-gutter-md
      .q-mb-md.col-xs-12.col-md-6
        q-card(v-if='$route.name === "workspace-detail"')
          q-card-section
            h1.text-h6.q-mt-none Manage Workspace
            q-input(label='Workspace title' v-model='library.currentWorkspace.title')
          q-card-section
            q-input(type='textarea' label='Short description' v-model='library.currentWorkspace.description' autogrow)
          q-card-actions
            q-btn-group.flex.full-width
              q-btn(icon='save' @click='save' label='Save')
              q-btn(icon='data_object' color='blue' @click='viewCode()' label='Code')
              q-btn(icon='fork_right' color='orange' @click='remix()' label='Remix')
              q-btn(color='negative' icon='delete' @click='deleteWorkspace()' label='Delete')

      .col-12.col-md-6
        q-card
          .text-center
            div(style='height: 290px; position: relative')
              BlocklyWorkspace(
                ref='$workspace'
                :workspaceID='$route.params.id'
                :isMain='isFullscreen'
                :isFullscreen='isFullscreen'
                :title='library.currentWorkspace.title'
                @onFullscreenToggle='toggleFullscreen'
              )
</template>

<script setup>
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import CodeIO from 'src/pages/workspace/CodeIO.vue'

import {onMounted, watch, ref, inject, nextTick} from 'vue'
import {uid, useQuasar} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {useLibraryStore} from 'stores/library'

const library = useLibraryStore()
const $router = useRouter()
const $route = useRoute()
const $bus = inject('$bus')
const $q = useQuasar()
let isFullscreen = ref($route.name === 'workspace' || $route.name === 'workspace-new')
const $workspace = ref(null)

/**
 * Switch between fullscreen and detail
 */
function toggleFullscreen ($event) {
  isFullscreen.value = $event
  if (isFullscreen.value) {
    $router.push({name: 'workspace', params: {id: $route.params.id}})
  } else {
    $router.push({name: 'workspace-detail', params: {id: $route.params.id}})
  }

  $bus.emit('workspace.reload', library.currentWorkspace, true)
}

/**
 * Loads the current workspace or the one with ID
 */
onMounted(() => {
  if (!$route.params.id && library.currentWorkspace.id) {
    $router.push({name: 'workspace', params: {id: library.currentWorkspace.id}})
  } else if (!$route.params.id) {
    library.$patch({currentWorkspace: {}})
    library.currentWorkspace.id = uid()
    $router.push({name: 'workspace', params: {id: library.currentWorkspace.id}})
  }
  nextTick(() => {
    $bus.emit('workspace.reload', library.currentWorkspace, true)
  })
})

function save () {
  $bus.emit('workspace.save')
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
      currentWorkspace: JSON.stringify(library.currentWorkspace)
    }
  })
}

/**
 * Creates a clone of this workspace
 * - No need to "open it" as we can just change the current workspace id
 * @todo Refactor with ./DashboardMain.vue
 */
function remix () {
  // Find workspace with current id
  const workspace = {...library.currentWorkspace}
  workspace.id = uid()
  workspace.title += ' (remix)'

  library.workspaces.push(workspace)
  library.$patch({currentWorkspace: {...workspace}})

  // Navigate to new workspace
  $router.push({name: 'workspace', params: {id: workspace.id}})
  $bus.emit('workspace.reload', workspace, true)
  $q.notify({message: 'Workspace remixed and opened into'})
}

/**
 * Delete workspace
 */
function deleteWorkspace () {
  $q.dialog({
    title: 'Delete Workspace',
    message: 'Are you sure you want to delete this workspace?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // Get index of workspace with id
    const index = library.workspaces.findIndex(workspace => workspace.id === library.currentWorkspace.id)
    library.workspaces.splice(index, 1)
    $router.push({name: 'library'})

    if (library.currentWorkspace.id === library.currentWorkspace.id) {
      library.$patch({currentWorkspace: {}})
      $bus.emit('workspace.reload', {id: library.currentWorkspace.id}, true)
      $q.notify({message: 'Active workspace deleted'})
    } else {
      $q.notify({message: 'Workspace deleted'})
    }
  })
}

</script>
