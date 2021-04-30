<template>
  <ChallengeRing v-if="show" @success="success" @failure="failure" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { events } from '../../events/nui';
import ChallengeRing from '../Challenge/ChallengeRing.vue';
import useReceiveEvent from './useReceiveEvent';
import useSendEvent from './useSendEvent';

const show = ref(false);

useReceiveEvent(events.challengeRing.start, () => (show.value = true));
const { sendEvent } = useSendEvent();

const success = () => {
  show.value = false;
  sendEvent(events.challengeRing.success);
};

const failure = () => {
  show.value = false;
  sendEvent(events.challengeRing.failure);
};
</script>
