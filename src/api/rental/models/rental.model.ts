import { Car } from '@app/api/car/models/car.model';
import { Client } from '@app/api/client/models/client.model';
import { Supplier } from '@app/api/supplier/models/supplier.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(type => Car, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'car_id' })
  car!: Car;

  @ManyToOne(type => Supplier, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Supplier;

  @ManyToOne(type => Client, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @Column({
    name: 'startTime',
    type: 'text',
    nullable: false,
  })
  startTime!: string;

  @Column({
    name: 'endTime',
    type: 'text',
    nullable: false,
  })
  endTime!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: string;
}
