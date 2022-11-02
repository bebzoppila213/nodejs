import express, { ErrorRequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import { UserController } from "./user/userController";
import bodyParser from "body-parser";
import { validate, ValidationError, Joi } from "express-validation";
import { TodoController } from "./todo/todoController";
import cors from "cors"
const app = express();
const port = 3005;
app.use(bodyParser.json());
app.use(cors());

const test = new UserController();
const test2 = new TodoController();
app.use('/', test.getRouter())
app.use('/', test2.getRouter())

app.use((err: ValidationError, req: any, res: any, next: any) => {
  res.status(err.statusCode).json('Произошла ошибка');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
