import { User } from "../../entity/User";

export interface ExerciseInterface {
  translation: string;
  code: string;
  user?: User;
  exerciseType: number;
  title: string;
  description: string;
  id?: number;
}
