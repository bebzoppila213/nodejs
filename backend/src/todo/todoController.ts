import { BaseController, ControllerDataType } from "../baseController";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../user/UserService";
import { TodoService } from "./TodoService";

export class TodoController extends BaseController {
  private todoService: TodoService;

  constructor() {
    super();
    this.todoService = new TodoService();
  }

  getControllerData(): ControllerDataType[] {
    return [
      {
        path: "/add-todo",
        method: "post",
        func: this.addTodo,
        midlware: this.authMidlware.bind(this),
      },

      {
        path: "/all-todo",
        method: "get",
        func: this.getAllTodo,
        midlware: this.authMidlware.bind(this),
      },

      {
        path: "/delete-todo",
        method: "post",
        func: this.deleteTodo,
        midlware: this.authMidlware.bind(this),
      },

      {
        path: "/toggle-todo",
        method: "post",
        func: this.toggleTodo,
        midlware: this.authMidlware.bind(this),
      },
    ];
  }

  private async authMidlware(req: Request<any, any, { token: string; title: string }>,res: Response,
    next: NextFunction
  ) {
    const userService = new UserService();
    const user = await userService.authFromToken(req.body.token);

    if (user === null) {
      this.send("unauthorized", res, {
        ok: false,
        message: "Пользователь не авторизован",
      });
    } else {
      next();
    }
  }

  private async addTodo(req: Request<any, any, { token: string; title: string }>,res: Response) {
    await this.todoService.create(req.body.title, req.body.token);
    this.send("create", res, { ok: true, message: "Создана запись" });
  }

  private async getAllTodo(req: Request<any, any, { token: string; }>,res: Response){
    const allTodo = await this.todoService.getAll(req.body.token)
    this.send("ok", res, { ok: true, message: "Все записи", allTodo});
  }

  private async deleteTodo(req: Request<any, any, { token: string, todoId: number }>,res: Response){
    const resDelete =  await this.todoService.deleteTodo(req.body.token, req.body.todoId)
    this.send("ok", res, { ok: true, message: "Запись удалена", resDelete});
  }

  private async toggleTodo(req: Request<any, any, { token: string, todoId: number, newDoneValue: boolean }>,res: Response){
    console.log(123);
    
    const resTodo =  await this.todoService.toggleTodo(req.body.token, req.body.todoId, req.body.newDoneValue)
    this.send("ok", res, { ok: true, message: "Запись измеена", resTodo});
  }
}
