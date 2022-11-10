<template lang="pug">
q-table(:rows='library.repos' :columns='columns' row-key='id' :grid="$q.screen.lt.lg" :rows-per-page-options='[10, 25, 50, 0]')
  //- Add rows
  template(v-slot:top)
    q-btn.gt-sm(icon='library_add' color='green' label='Add Repository' @click='addRepo')
    .row.flex
      q-btn.lt-md.full-width(icon='library_add' color='green' label='Create Add Repository' @click='addRepo')

  //- Rows with inline-edit
  template(v-slot:body='props')
    q-tr(:props='props')
      q-td(key='title' :props='props') {{ props.row.title }}
      q-td(key='source' :props='props') {{props.row.source}}
      q-td(key='active' :props='props')
        q-toggle(v-model='props.row.active')
      q-td(key='actions' :props='props')
        q-btn(color='negative' icon='delete' @click='deleteWorkspace(props)' label='Delete')
</template>

<script setup>
import {useSettingsStore} from 'stores/settings'
import {useLibraryStore} from 'stores/library'

const columns = $ref([
  { name: 'title', align: 'left', field: 'title', label: 'Title' },
  { name: 'source', align: 'left', field: 'source', label: 'Source' },
  { name: 'active', align: 'left', field: 'active', label: 'Active?' },
  { name: 'actions', align: 'left', field: 'actions', label: 'Actions'},
])
const library = useLibraryStore()

/**
 * Add new workspace
 */
function addRepo () {
  // $q.dialog({
  //   component: CodeIO,
  //   componentProps: {
  //     workspaces: JSON.stringify(library.workspaces),
  //     currentWorkspace: JSON.stringify([row]),
  //     title: 'Export workspace',
  //     exportMessage: 'Copy the code below to paste this workspace into another. You can also download the .json file for sharing or backup.',
  //     excludeImport: true,
  //   }
  // })
}
</script>
