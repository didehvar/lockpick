<template>
  <div class="canvas">
    <CanvasRing color="darkgrey" />
    <CanvasRing
      color="purple"
      :start-angle="targetAngle.start"
      :end-angle="targetAngle.end"
    />
    <CanvasRing color="white" :start-angle="0" :end-angle="time.angle" />
    <div class="caption">{{ requiredInput }}</div>
  </div>
  <input ref="input" @keydown="attempt" />
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive, ref } from 'vue';
import { inRange, random } from 'lodash-es';
import CanvasRing from './Canvas/CanvasRing.vue';

const props = defineProps({
  times: {
    type: Number,
    default: 4,
  },
});

const input = ref<HTMLElement | null>(null);

const requiredInput = ref(0);
const time = reactive({ angle: 50, speed: 0 });
const targetAngle = reactive({ start: 0, end: 0 });

let timesRun = 0;
let start: number = 0;
let animationFrame: number = 0;

onMounted(() => {
  input.value?.focus();
  restart();
});

const tick = (timestamp: number) => {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  time.angle = Math.min(elapsed / time.speed, 360);
  if (time.angle < 360) animationFrame = requestAnimationFrame(tick);
  else failure();
};

const restart = () => {
  requiredInput.value = random(1, 4);
  time.angle = 0;
  time.speed = random(2, 20);
  targetAngle.start = random(85, 300);
  targetAngle.end = targetAngle.start + random(25, 50);

  start = 0;
  animationFrame = requestAnimationFrame(tick);
};

const stop = () => cancelAnimationFrame(animationFrame);

const success = () => {
  stop();
  if (++timesRun < props.times) return restart();
};

const failure = () => {
  stop();
};

const attempt = (event: KeyboardEvent) => {
  if (
    Number(event.key) === requiredInput.value &&
    inRange(time.angle, targetAngle.start, targetAngle.end)
  ) {
    return success();
  }

  failure();
};
</script>

<style scoped lang="postcss">
.canvas {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    position: absolute;
  }
}

.caption {
  color: white;
  font-size: 5em;
}

input {
  opacity: 0;
}
</style>
