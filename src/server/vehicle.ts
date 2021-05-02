import { Connection } from 'typeorm';
import { events } from '../utils/events';
import { User } from './entity/user';
import { Vehicle } from './entity/vehicle';
import { playerFivemId } from './utils';

export function vehicleEvents(connection: Connection) {
  const vehicleRepository = connection.getRepository(Vehicle);
  const userRepository = connection.getRepository(User);

  onNet(events.vehicle.isOwned, async (vehicleHandle: number) => {
    const fivemId = playerFivemId();
    const vehicle = await vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoin('vehicle.owner', 'owner', 'owner.fivemId = :fivemId', {
        fivemId,
      })
      .where('vehicle.handle = :vehicleHandle', { vehicleHandle })
      .getOne();

    emitNet(
      vehicle ? events.vehicle.owned : events.vehicle.unowned,
      source,
      vehicleHandle
    );
  });

  onNet(events.vehicle.hotwired, async (vehicleHandle: number) => {
    const fivemId = playerFivemId();
    const owner = await userRepository.save({ fivemId });
    await vehicleRepository.save({ handle: vehicleHandle, owner });
  });
}
