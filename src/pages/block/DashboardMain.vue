<template lang="pug">
q-card
  q-card-section
    q-table(v-if='settings.ui.sidebar.left.maximized' title='Workspaces' :rows='Object.values(library.workspaces)' :columns='columns' row-key='id' :grid="$q.screen.lt.md")
  //- //- Add rows
  //- template(v-slot:top)
  //-   q-btn(icon='dns' label='Add GPU' @click='addRow')
  //- //- Rows with inline-edit
  //- template(v-slot:body='props')
  //-   q-tr(:props='props')
  //-     //- Base
  //-     q-td(key='base' :props='props')
  //-       //- | test
  //-       q-input(v-model='props.row.base' dense autofocus)
  //-     //- API
  //-     q-td(key='api' :props='props')
  //-       q-select(v-model='props.row.api' :options='apiVersions' default='1.4' label='API')
  //-     //- Actions
  //-     q-td(key='actions' :props='props')
  //-       q-toggle.q-mr-md(v-model='props.row.enabled' :label='props.row.enabled ? "Enabled" : "Disabled"' color='yellow')
  //-       q-btn(color='negative' icon='delete' @click='deleteRow(props)')
  //- //- Responsive
  //- template(v-slot:item='props')
  //-   .q-pa-md
  //-     .col-xs-12.col-sm-6.col-md-4
  //-       q-card
</template>

<script setup>
import {useLibraryStore} from 'stores/library'
import {useQuasar} from 'quasar'
import {useSettingsStore} from 'stores/settings'

const $q = useQuasar()
const library = useLibraryStore()
const settings = useSettingsStore()
const columns = $ref([
  { name: 'title', align: 'left', field: 'title', label: 'Title' },
  { name: 'description', align: 'left', field: 'description', label: 'Description' },
  { name: 'actions', align: 'left', field: 'actions', label: 'Actions'},
])

function save () {
  console.log('save')
}

function remix () {
  console.log('save')
}

function reload () {
  console.log('reset')
}

</script>
