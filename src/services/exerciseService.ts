import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Exercise } from "../entity/Exercise";
import { ExerciseType } from "../entity/ExerciseType";
import { User } from "../entity/User";
import { ExerciseInterface } from "../interfaces/exercise";

class ExerciseService {
  exerciseRepository: Repository<Exercise>;
  userRepository: Repository<User>;
  exerciseTypeRepository: Repository<ExerciseType>;

  constructor() {
    this.exerciseRepository = AppDataSource.getRepository(Exercise);
    this.exerciseTypeRepository = AppDataSource.getRepository(ExerciseType);
    this.userRepository = AppDataSource.getRepository(User);
  }
  async create(createExerciseDto: ExerciseInterface, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const newExercise = this.exerciseRepository.create({
      code: createExerciseDto.code,
      translation: createExerciseDto.translation,
      description: createExerciseDto.description,
      title: createExerciseDto.title,
      exerciseType: createExerciseDto.exerciseType,
      user: user,
    });

    return await this.exerciseRepository.save(newExercise);
  }
  async findUserExercises(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const exercises = await this.exerciseRepository.find({
      where: { user: user },
    });
    return exercises;
  }

  async getExerciseInfo(exerciseId: number) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
    });
    return exercise;
  }
  async deleteExercise(exerciseId: number) {
    const deletedExercise = await this.exerciseRepository.delete(exerciseId);
    return deletedExercise;
  }
}

export default new ExerciseService();
