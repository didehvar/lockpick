<template>
  <div class="challenge">
    <EventChallengeRing />
  </div>
</template>

<script setup lang="ts">
import EventChallengeRing from './components/Event/EventChallengeRing.vue';
</script>

<style>
html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
</style>

<style scoped>
.challenge {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
