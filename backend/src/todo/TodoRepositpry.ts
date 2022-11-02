import { BaseRepository } from "../baseRepository";

export class TodoRepository extends BaseRepository {
  public async create(title: string, ownerId: number) {
    await this.prisma.todo.create({
      data: {
        title: title,
        ownerId: ownerId,
      },
    });
  }

  public async getAll(ownerId: number) {
    const allTodo = await this.prisma.todo.findMany({
      where: { ownerId: ownerId },
    });
    return allTodo;
  }

  public async delete(todoId: number, ownerId: number) {
    return await this.prisma.todo.deleteMany({
      where: { id: todoId, ownerId: ownerId },
    });
  }

  public async toggle(todoId: number, ownerId: number, newDoneValue: boolean) {
    return await this.prisma.todo.updateMany({
      where: { id: todoId, ownerId: ownerId },
      data: {
        done: newDoneValue,
      },
    });
  }
}
