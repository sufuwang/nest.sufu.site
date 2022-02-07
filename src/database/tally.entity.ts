import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Tally {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  kind: string;

  @Column()
  outcome: number;

  @Column()
  detail: string;

  @Column()
  create_time: string;

  @Column()
  update_time: string;
}
