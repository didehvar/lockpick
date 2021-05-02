import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: number;

  @Column({ unique: true })
  fivemId?: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
  vehicles!: Vehicle[];
}
