import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { User as UserType } from "../interfaces/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class UserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  async create(createUserDto: UserType) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 12);
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
    });
    return this.userRepository.save(newUser);
  }

  findOne(condition: any) {
    const user = this.userRepository.findOneBy(condition);
    return user;
  }
  signUser(userId: number, email: string) {
    return jwt.sign(
      {
        sub: userId,
        email: email,
        type: "test",
      },
      process.env.ACCESS_TOKEN_SECRET
    );
  }
}

export default new UserService();
