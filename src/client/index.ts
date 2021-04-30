import { events } from '../events/nui';
import { callVueEvent, onVueCallback } from './events';

emit('chat:addMessage', {
  args: ['Client init'],
});

setTimeout(() => {
  SetNuiFocus(true, false);
  callVueEvent(events.challengeRing.start);
}, 1000);

onVueCallback(events.challengeRing.failure, (data, callback) => {
  console.log('oh no');
  SetNuiFocus(true, false);
  callback({});
});

onVueCallback(events.challengeRing.success, (data, callback) => {
  console.log('huzzah!');
  SetNuiFocus(true, false);
  callback({});
});
