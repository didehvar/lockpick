import { events } from '../utils/events';

RegisterKeyMapping(
  '+lockpick',
  'Use to unlock or hotwire vehicles',
  'MOUSE_BUTTON',
  'MOUSE_EXTRABTN2'
);

RegisterCommand('+lockpick', () => emit(events.lockpick.start), false);
RegisterCommand('-lockpick', () => {}, false);
