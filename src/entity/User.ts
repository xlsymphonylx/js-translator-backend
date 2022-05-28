import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Exercise } from "./Exercise";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
