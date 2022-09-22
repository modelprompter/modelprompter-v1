<template lang="pug">
q-card(clickable)
  q-card-section
    pre {{props.data}}
</template>

<script setup>
const props = defineProps(['data'])
</script>
