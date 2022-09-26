<template lang="pug">
q-card
  q-card-section
    q-table(v-if='settings.ui.sidebar.left.maximized' title='Workspaces' :rows='library.workspaces' :columns='columns' row-key='id' :grid="$q.screen.lt.md")
      //- Add rows
      template(v-slot:top)
        q-btn(icon='library_add' label='Start a new Workspace' @click='addRow')
      //- Rows with inline-edit
      template(v-slot:body='props')
        q-tr(:props='props')
          //- Title
          q-td(key='title' :props='props')
            | {{ props.row.title }}
            q-popup-edit(v-model='props.row.title' v-slot='scope')
              q-input(v-model='scope.value' dense autofocus)
          //- Description
          q-td(key='description' :props='props')
            | {{props.row.description}}
            q-popup-edit(v-model='props.row.description' v-slot='scope')
              q-input(v-model='scope.value' type='textarea' dense autofocus)
          //- Actions
          q-td(key='actions' :props='props')
            q-btn(color='negative' icon='delete' @click='deleteRow(props)')
      //- Responsive
      template(v-slot:item='props')
        .q-pa-md
          .col-xs-12.col-sm-6.col-md-4
            q-card
</template>

<script setup>
import {useLibraryStore} from 'stores/library'
import {useQuasar} from 'quasar'
import {useSettingsStore} from 'stores/settings'

const $q = useQuasar()
const settings = useSettingsStore()
const columns = $ref([
  { name: 'title', align: 'left', field: 'title', label: 'Title' },
  { name: 'description', align: 'left', field: 'description', label: 'Description' },
  { name: 'actions', align: 'left', field: 'actions', label: 'Actions'},
])
const library = useLibraryStore()

function save () {
  console.log('save')
}

function remix () {
  console.log('save')
}

function reload () {
  console.log('reset')
}

function addRow () {

}

</script>
