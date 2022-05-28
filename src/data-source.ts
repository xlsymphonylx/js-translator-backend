import "reflect-metadata";
import { DataSource } from "typeorm";
import { Exercise } from "./entity/Exercise";
import { ExerciseType } from "./entity/ExerciseType";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "js_translator",
  synchronize: true,
  logging: false,
  entities: [User, Exercise, ExerciseType],
  migrations: [],
  subscribers: [],
});
