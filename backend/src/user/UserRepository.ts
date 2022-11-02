import { Prisma, PrismaClient, User } from "@prisma/client";
import { BaseRepository } from "../baseRepository";
import { User as CurrentUser } from "./User";

interface IUserRepository {
  create: (user: CurrentUser) => Promise<boolean>;
  findFromEmail: (email: string) => Promise<User>;
}

export class UserRepository extends BaseRepository implements IUserRepository {
  async create(currentUser: CurrentUser): Promise<boolean> {
    let result = false;
    let user;
    try {
      user = await this.prisma.user.create({data: currentUser.getAllData(),});
      result = true;
    } catch (e) {
      // console.log(123);
      
      result = false;
    }
    this.prisma.$disconnect();
    return result;
  }

  async findFromEmail(email: keyof User) {
    const user = await this.prisma.user.findFirst({ where: {email} });
    this.prisma.$disconnect();
    return user;
  }

  async findFromToken(token: keyof User): Promise<User | null>  {
    const user = await this.prisma.user.findFirst({ where: {token: token} });
    this.prisma.$disconnect();
    return user;
  }

  async findFromField(field: keyof User, value: string){
    const findData = {[field]: value}
    const user = await this.prisma.user.findFirst({ where: findData });
    return user
  }
}
