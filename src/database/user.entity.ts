import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column()
  session_id: string;

  @Column()
  max_age: number;

  @Column()
  create_time: string;

  @Column()
  update_time: string;

  @Column()
  timestamp: string;
}
