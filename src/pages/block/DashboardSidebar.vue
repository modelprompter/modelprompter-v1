<template lang="pug">
q-card.q-mt-md
  q-card-section
    div.text-h6 Worspace Settings
  q-space
  q-card-actions
    .col-4
      q-btn.full-width(color='red' icon='restart_alt' @click='reload')
    .col-8.q-pl-xs
      q-btn.full-width(color='green' icon='save' @click='save')
</template>

<script setup>
import {inject} from 'vue'
const $bus = inject('$bus')

function save () {
  $bus.emit('dashboard.sidebar.save')
}

function remix () {
  console.log('save')
}

function reload () {
  console.log('reset')
}

</script>
