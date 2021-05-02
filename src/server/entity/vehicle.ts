import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Vehicle {
  @PrimaryColumn()
  handle!: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  owner?: User;
}
