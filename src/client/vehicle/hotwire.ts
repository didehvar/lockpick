import { Game } from 'fivem-js';
import { chatMessage } from '../../utils/chat';
import { events } from '../../utils/events';
import { callVueEvent, onVueCallback } from '../events';

on(events.lockpick.start, () => {
  const vehicle = Game.PlayerPed.CurrentVehicle;

  // todo: check vehicle isn't owned/running
  if (!vehicle) return;

  callVueEvent(events.challengeRing.start);
});

onVueCallback(events.challengeRing.failure, (data, callback) => {
  callback({});
  chatMessage('Hotwire failed');
});

onVueCallback(events.challengeRing.success, (data, callback) => {
  callback({});

  const vehicle = Game.PlayerPed.CurrentVehicle;
  vehicle.IsDriveable = false;
  vehicle.IsEngineRunning = true;

  emitNet(events.vehicle.hotwired, vehicle.Handle);
});
