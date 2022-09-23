<template lang="pug">
q-card(clickable)
  q-img(v-if='props.data.image' :src='props.data.image')
  q-card-section
    pre {{props.data}}
</template>

<script setup>
const props = defineProps(['data'])
</script>
