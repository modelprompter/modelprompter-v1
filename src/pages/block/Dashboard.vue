<template lang="pug">
q-card
  q-card-section
    div.text-h6 Worspace Settings
  q-space
  q-card-actions
    div.full-width
      q-btn.full-width(color='green' icon='file_upload' @click='save') Export
    div.full-width.row.q-mt-md
      q-btn.col-6(icon='file_download' @click='load')
        span.q-ml-sm Import
      q-btn.col-6(color='red' icon='restart_alt' @click='load')
        span.q-ml-sm Reset
</template>

<script setup>
function save () {
  console.log('save')
}

function load () {
  console.log('load')
}

function reset () {
  console.log('reset')
}
</script>
