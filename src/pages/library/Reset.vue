<template lang="pug">
.text-white.text-center.q-pa-md.flex.flex-center
  q-card
    q-card-section.q-pa-xl
      .text-h1 Reset Data?
      .text-h4.q-mt-xl This will reset <b>everything</b> and cannot be undone
      q-btn.q-mt-xl(color='red' label='Yes, reset data' @click='resetData' :to='{path: "/"}')
</template>

<script setup>
import { useQuasar } from 'quasar'
const $q = useQuasar()

function resetData () {
  $q.notify({
    message: 'Data reset',
    color: 'green',
    position: 'top',
    timeout: 1000
  })
  localStorage.clear()
  location.reload()
}
</script>
