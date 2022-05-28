import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExerciseType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  description: string;
}
