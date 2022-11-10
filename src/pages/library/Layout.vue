<template lang="pug">
q-page.q-pa-md
  q-tabs(v-model='tab' align='left')
    q-route-tab(:to="{name: 'librarySession'}" name='session' label='Session Library')
    q-route-tab(:to="{name: 'libraryRepos'}" name='repos' label='Repositories')
    q-space
    router-link.q-mr-lg.text-red.align-right(:to='{path: "/reset"}' style="text-decoration: none")
      q-icon.q-mr-sm(name='delete')
      | Reset

  q-tab-panels(v-model='tab')
    q-tab-panel(name='session')
      LibrarySession
    q-tab-panel(name='repos')
</template>

<script setup>
import LibrarySession from 'src/pages/library/Session.vue'

const tab = $ref('session')
</script>
