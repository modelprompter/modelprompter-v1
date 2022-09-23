<template lang="pug">
q-card(clickable)
  q-img.clickable(v-if='props.data.image' :src='props.data.image' @click='expand')
  q-card-section(v-else)
    pre {{props.data}}
</template>

<script setup>
const props = defineProps(['data'])

function expand () {
  console.log('expand')
}
</script>
