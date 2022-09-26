<template lang="pug">
q-card.q-mt-md
  q-card-section
    div.text-h6 Workspace Settings
  q-space
  q-card-actions
    .col-4
      q-btn.full-width(color='red' icon='restart_alt' @click='reload')
    .col-8.q-pl-xs
      q-btn.full-width(icon='save' @click='save')
    q-input.col-12.q-mt-md(v-model='library.currentWorkspace.title' label='Title' dense)
    q-input.col-12.q-mt-md(type='textarea' autogrow v-model='library.currentWorkspace.description' label='Description' dense)
</template>

<script setup>
import {useLibraryStore} from 'stores/library'
import {inject} from 'vue'
import {useQuasar} from 'quasar'

const $q = useQuasar()
const $bus = inject('$bus')
const library = useLibraryStore()

function save () {
  $bus.emit('dashboard.sidebar.save')
  $q.notify({
    message: 'Workspace saved',
    color: 'positive',
  })
}

function reload () {
  console.log('reset')
}

</script>
