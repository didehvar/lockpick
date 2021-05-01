import { Game, Vehicle } from 'fivem-js';
import { delay } from '../../utils/time';
import { events } from '../../utils/events';

setTick(async () => {
  const playerHandle = Game.PlayerPed.Handle;
  let prevVehicle: Vehicle | null = null;
  let prevEnteringVehicle: Vehicle | null = null;

  while (true) {
    await delay(50);

    if (Game.PlayerPed.isDead()) {
      prevVehicle = null;
      prevEnteringVehicle = null;
      continue;
    }

    const currentVehicle = Game.PlayerPed.CurrentVehicle;
    if (prevVehicle) {
      if (!currentVehicle) {
        emit(events.vehicle.exited, playerHandle, prevVehicle.Handle);
        prevVehicle = null;
      }
      continue;
    }

    if (currentVehicle) {
      emit(events.vehicle.entered, playerHandle, currentVehicle.Handle);
      prevVehicle = currentVehicle;
      prevEnteringVehicle = null;
      continue;
    }

    const enteringVehicle = Game.PlayerPed.VehicleTryingToEnter;
    if (enteringVehicle) {
      if (!prevEnteringVehicle) {
        emit(events.vehicle.entering, playerHandle, enteringVehicle.Handle);
      }
      prevEnteringVehicle = enteringVehicle;
      continue;
    }

    if (prevEnteringVehicle) {
      emit(events.vehicle.aborted, playerHandle, prevEnteringVehicle.Handle);
      prevEnteringVehicle = null;
    }
  }
});
