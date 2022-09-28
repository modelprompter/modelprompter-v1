<template lang="pug">
.text-white.text-center.q-pa-md.flex.flex-center
  div.q-mt-xl
    .text-h1 Reset Data?
    .text-h4.q-mt-xl This will reset <b>everything</b> and cannot be undone

    q-btn.q-mt-xl.q-mr-xl(color='light' label='Cancel, take me back home' :to='{path: "/"}')
    q-btn.q-mt-xl(color='red' label='Reset data' @click='resetData' :to='{path: "/"}')
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useSettingsStore } from 'stores/settings'
import { onMounted } from 'vue'

const $q = useQuasar()
const settings = useSettingsStore()

onMounted(() => {
  settings.ui.sidebar.left.maximized = false
  settings.ui.sidebar.right.maximized = false
  settings.ui.sidebar.left.open = false
  settings.ui.sidebar.right.open = false
})

function resetData () {
  $q.notify({
    message: 'Data reset',
    color: 'green',
    position: 'top',
    timeout: 1000
  })
  setTimeout(() => {
    localStorage.clear()
    location.reload()
  }, 500)
}
</script>
