<script lang="ts">
import { defineComponent, h } from 'vue';
import useCanvas from './useCanvas';

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'purple',
    },
    endAngle: {
      type: Number,
      default: 360,
    },
    radius: {
      type: Number,
      default: 85,
    },
    startAngle: {
      type: Number,
      default: 0,
    },
    thickness: {
      type: Number,
      default: 15,
    },
  },
  setup(props) {
    const { canvas, context } = useCanvas();

    return () => {
      const ctx = context.value;
      if (ctx) {
        const center = props.radius + props.thickness;
        const size = center * 2;
        ctx.clearRect(0, 0, size, size);

        ctx.beginPath();
        ctx.strokeStyle = props.color;
        ctx.lineWidth = props.thickness;
        ctx.arc(
          center,
          center,
          props.radius,
          (props.startAngle * Math.PI) / 180 - Math.PI / 2,
          (props.endAngle * Math.PI) / 180 - Math.PI / 2
        );
        ctx.stroke();
      }

      return h('canvas', {
        ref: canvas,
      });
    };
  },
});
</script>
