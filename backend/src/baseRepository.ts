import { Prisma, PrismaClient, User } from "@prisma/client";

export abstract class BaseRepository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  protected disconnect() {
    this.prisma.$disconnect();
  }
}