import { Vehicle, VehicleLockStatus } from 'fivem-js';
import { events } from '../../utils/events';
import './hotwire';
import './state';

on(events.vehicle.entering, (playerHandle: number, vehicleHandle: number) => {
  const vehicle = new Vehicle(vehicleHandle);
  if (vehicle.Driver.Handle) {
    vehicle.LockStatus = VehicleLockStatus.Locked;
    return;
  }
  vehicle.NeedsToBeHotwired = false;
  vehicle.IsDriveable = true;
  vehicle.IsEngineRunning = false;
});
