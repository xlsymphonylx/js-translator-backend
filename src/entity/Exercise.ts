import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ExerciseType } from "./ExerciseType";
import { User } from "./User";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500,
  })
  code: string;

  @Column({
    length: 500,
  })
  translation: string;

  @Column({
    length: 50,
  })
  title: string;

  @Column({
    length: 150,
  })
  description: string;

  @Column()
  exerciseType: number;

  @ManyToOne(() => User, (user) => user.exercises)
  user: User;


}
