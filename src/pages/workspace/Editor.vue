<template lang="pug">
q-page
  .content
    .row.q-col-gutter-md
      .q-mb-md.col-xs-12.col-md-6
        q-card
          q-card-section
            h1.text-h6.q-mt-none Manage Workspace
            q-input(label='Workspace title' v-model='library.currentWorkspace.title')
          q-card-section
            q-input(type='textarea' label='Short description' v-model='library.currentWorkspace.description' autogrow)
          q-card-actions
            q-btn-group.flex.full-width
              q-btn(icon='save' @click='save' label='Save')
              q-btn(icon='data_object' color='blue' @click='viewCode(props.row)' label='Code')
              q-btn(icon='fork_right' color='orange' @click='remix(props.row)' label='Remix')
              q-btn(color='negative' icon='delete' @click='deleteWorkspace(props)' label='Delete')

      .col-12.col-md-6
        q-card
          .text-center
            div(style='height: 290px; position: relative')
              BlocklyWorkspace(:workspaceID='$route.params.id' :isMain='true' :isFullscreen='true' :title='library.currentWorkspace.title')
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

/**
 * Loads the current workspace or the one with ID
 */
onMounted(() => {
  if (!$route.params.id && library.currentWorkspace.id) {
    $router.push({name: 'active-block', params: {id: library.currentWorkspace.id}})
    nextTick(() => {
      $bus.emit('workspace.dashboard.main.reload', library.currentWorkspace, {
        viewLeft: library.currentWorkspace.viewLeft,
        viewTop: library.currentWorkspace.viewTop,
        scale: library.currentWorkspace.scale,
      }, true)
    })
  } else if (!$route.params.id) {
    library.currentWorkspace.id = uid()
    $router.push({name: 'active-block', params: {id: library.currentWorkspace.id}})
  }
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
      currentWorkspace: JSON.stringify([library.currentWorkspace])
    }
  })
}
</script>
