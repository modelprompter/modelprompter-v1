<template lang="pug">
q-card
  q-card-section
    div.text-h6 Worspace Settings
  q-space
  q-card-actions
    div.full-width
      q-btn.q-mb-md.full-width(color='green' icon='save' @click='save' label='Save')
    div.full-width
      q-btn.full-width(color='purple' icon='content_copy' @click='remix' label='Remix')
    div.full-width.row.q-mt-md
      q-btn.col-6.full-width(color='red' icon='restart_alt' @click='reload' label='Reload')
</template>

<script setup>
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
