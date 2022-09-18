<template lang="pug">
q-card
  q-card-section
    .text-h6 GPU Servers
  q-card-section
    p Model Prompter doesn't yet offer GPUs, you'll need to spin them up yourself. However this can be done for free! You can either use a local one through <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">AUTOMATIC1111/stable-diffusion-webui</a> and <a href="https://github.com/sd-webui/stable-diffusion-webui">sd-webui/stable-diffusion-webui</a>, or use a cloud hosted notebooks:
    ul
      li
        | Google Colab:
        a(href='https://colab.research.google.com/drive/1Iy-xW9t1-OQWhb0hNxueGij8phCyluOh') StableDiffusionUI-Voldemort.ipynb

  q-card-section
    q-table(title='GPU Server List' :rows='settings.servers' :columns='columns' row-key='base' :grid="$q.screen.lt.md")
      //- Add rows
      template(v-slot:top)
        q-btn(icon='dns' label='Add GPU' @click='addRow')
      //- Rows with inline-edit
      template(v-slot:body='props')
        q-tr(:props='props')
          //- Base
          q-td(key='base' :props='props')
            //- | test
            q-input(v-model='props.row.base' dense autofocus)
          //- API
          q-td(key='api' :props='props')
            q-select(v-model='props.row.api' :options='apiVersions' default='1.4' label='API')
          //- Actions
          q-td(key='actions' :props='props')
            q-toggle.q-mr-md(v-model='props.row.enabled' :label='props.row.enabled ? "Enabled" : "Disabled"' color='yellow')
            q-btn(color='negative' icon='delete' @click='deleteRow(props)')
      //- Responsive
      template(v-slot:item='props')
        .q-pa-md
          .col-xs-12.col-sm-6.col-md-4
            q-card
              q-card-section
                p(key='base' :props='props')
                  q-input(v-model='props.row.base' dense autofocus)
                //- API
                p(key='api' :props='props')
                  q-select(v-model='props.row.api' :options='apiVersions' default='1.4' label='API')
                //- Actions
                p(key='actions' :props='props' v-if='settings.servers.length > 1')
                  q-toggle.q-mr-md(v-model='props.row.enabled' :label='props.row.enabled ? "Enabled" : "Disabled"' color='yellow')
                  q-btn(color='negative' icon='delete' @click='deleteRow(props)')
</template>

<script setup>
import {useSettingsStore} from '../stores/settings'
import {useQuasar} from 'quasar'

const $q = useQuasar()

/**
 * Store
 */
const settings = useSettingsStore()




/**
 * Props
 */
const columns = $ref([
  { name: 'base', align: 'left', field: 'base', label: 'Base URL' },
  { name: 'api', align: 'left', field: 'api', label: 'API'},
  { name: 'actions', align: 'left', label: 'Actions' },
])
const apiVersions = $ref(['AUTOMATIC1111-1', 'AUTOMATIC1111-2'])












/**
 * Methods
 */
function addRow () {
  settings.servers.push({
    base: '',
    api: 'AUTOMATIC1111-2',
    enabled: true
  })
}

function deleteRow (props) {
  settings.servers.splice(props.rowIndex, 1)
}
</script>
