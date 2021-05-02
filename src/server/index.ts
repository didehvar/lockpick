import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Vehicle } from './entity/vehicle';
import { User } from './entity/user';
import { vehicleEvents } from './vehicle';

async function start() {
  try {
    const connection = await createConnection({
      type: 'postgres',
      url: GetConvar('pg_connection_string', ''),
      entities: [User, Vehicle],
      synchronize: true,
      logging: true,
    });

    vehicleEvents(connection);

    console.log('server setup complete');
  } catch (ex) {
    console.error('server crashed');
    console.error(ex.message);
    return;
  }
}

start();
