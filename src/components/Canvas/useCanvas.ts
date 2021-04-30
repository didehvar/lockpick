import { computed, onMounted, ref, watch } from 'vue';

export default function useCanvas() {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);

  const dimensions = computed(() => ({
    width: canvas.value?.parentElement?.clientWidth || 0,
    height: canvas.value?.parentElement?.clientHeight || 0,
  }));

  onMounted(() => {
    context.value = canvas.value?.getContext('2d') || null;
  });

  watch(dimensions, ({ width, height }) => {
    if (!canvas.value) return;
    canvas.value.width = width;
    canvas.value.height = height;
  });

  return { canvas, context };
}
