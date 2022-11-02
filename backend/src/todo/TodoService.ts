
import { UserService } from "../user/UserService";
import { TodoRepository } from "./TodoRepositpry";


export class TodoService{
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository()
    }  

    private async findUser(token: string){
        const userService = new UserService();
        return await userService.find('token', token)
    }

    public async create(title: string, token: string) {
        const user = await this.findUser(token)
        this.todoRepository.create(title, user.id)
    }

    public async getAll(token: string){
        const user = await this.findUser(token)
        return await this.todoRepository.getAll(user.id)
    }

    public async deleteTodo(token: string, todoId: number){
        const user = await this.findUser(token)
        return await this.todoRepository.delete(todoId, user.id)
    }

    public async toggleTodo(token: string, todoId: number, newDoneValue: boolean){
        const user = await this.findUser(token)
        return await this.todoRepository.toggle(todoId, user.id, newDoneValue)
    }
}