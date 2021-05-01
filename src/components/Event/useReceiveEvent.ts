import { onUnmounted } from 'vue';
import { NuiEvent } from '../../utils/events';

const nuiEvent = 'message';

export default function useReceiveEvent(
  eventName: string,
  listener: () => void
) {
  const eventListener: EventListener = (nuiEvent) => {
    const {
      data: { event },
    } = nuiEvent as NuiEvent;

    if (event === eventName) listener();
  };

  addEventListener(nuiEvent, eventListener);

  onUnmounted(() => removeEventListener(nuiEvent, eventListener));
}
