<template lang="pug">
BaseLayout
  q-page
    .q-pa-md
      .q-gutter-y-md
        q-card
          q-card-section
            q-tabs(dense align='left' narrow-indicator)
              q-route-tab(to='/quick' label='Quick Prompt')
              q-route-tab(to='/quick/servers' label='GPU Servers')
            div
              router-view
</template>

<script setup>
import BaseLayout from './Base.vue'
</script>
