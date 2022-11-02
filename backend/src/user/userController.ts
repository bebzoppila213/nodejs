import { BaseController, ControllerDataType } from "../baseController";
import { Request, Response } from "express";
import { validate, Joi } from "express-validation";
import { UserService } from "./UserService";
import { User } from "@prisma/client";

const registerValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    name: Joi.string().required(),
  }),
};

const authValidationEmail = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
  }),
};

const authValidationToken = {
  body: Joi.object({
    token: Joi.string().required(),
  }),
};

export class UserController extends BaseController {
  private service: UserService;
  // d3jFxz71hmS1JTIuwDeZI2Y92RDEIV
  constructor() {
    super();
    this.service = new UserService();
  }
  getControllerData(): ControllerDataType[] {
    return [
      {
        path: "/register",
        method: "post",
        func: this.register,
        midlware: validate(registerValidation, {}, {}),
      },
      {
        path: "/auth-email",
        method: "post",
        func: this.authEmail,
        midlware: validate(authValidationEmail, {}, {}),
      },
      {
        path: "/auth-token",
        method: "post",
        func: this.authToken,
        midlware: validate(authValidationToken, {}, {}),
      },
    ];
  }

  private async register(
    req: Request<any, any, { password: string; email: string; name: string }>,
    res: Response
  ) {
    console.log(req.body);
    
    const createResult = await this.service.create(req.body);
    console.log(createResult);
    if (!createResult.result) {
      this.send("conflict", res, { ok: false, message: "Ошибка регистрации" });
    } else {
      this.send("create", res, {
        ok: true,
        message: "Ошибка регистрации",
        token: createResult.token,
      });
    }
  }

  private async authEmail(
    req: Request<any, any, { password: string; email: string }>,
    res: Response
  ) {
    const user = await this.service.authFromPassword(
      req.body.email,
      req.body.password
    );
    this.checkedUser(user, res);
  }

  public async authToken(
    req: Request<any, any, { token: string }>,
    res: Response
  ) {
    const user = await this.service.authFromToken(req.body.token);
    this.checkedUser(user, res);
  }

  private checkedUser(user: User, res: Response) {
    if (user === null) {
      this.send("unauthorized", res, {
        ok: false,
        message: "Пользователь не авторизован",
      });
    }

    this.send("ok", res, {
      ok: true,
      message: "Пользователь авторизован",
      user,
    });
  }
}
