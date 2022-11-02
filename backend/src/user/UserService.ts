import { User } from "./User";
import { UserRepository } from "./UserRepository";
import { Prisma, PrismaClient, User as PrismaUser } from "@prisma/client";
import { Cryptography } from "../common/Cryptography";
import { generate, verify } from "password-hash";

interface IUserInfo {
  password: string;
  email: string;
  name: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async create(
    UserInfo: IUserInfo
  ): Promise<{ result: boolean; token: string }> {
    const newUser = new User(UserInfo.email, UserInfo.name);
    await newUser.hashPassword(UserInfo.password);
    newUser.createToken();
    const result = await this.userRepository.create(newUser);
    return { result: result, token: newUser.getToken() };
  }

  public async find(field: keyof PrismaUser, value: string) {
    const result = await this.userRepository.findFromField(field, value);
    return result;
  }

  public async authFromPassword(email: string, password: string) {
    const user = await this.userRepository.findFromField("email", email);

    if (verify(password, user.password)) {
      return user;
    }

    return null;
  }

  public async authFromToken(token: string){
    const user = await this.userRepository.findFromField("token", token);
    return user;
  }

  public async findFromEmail() {
    // const result = await this.userRepository.findFromToken(newUser)
  }
}
