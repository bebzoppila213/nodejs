import express, { Request, RequestHandler, Response, Router } from "express";

export type ControllerDataType = {
  path: string;
  func: (req: Request, res: Response) => void;
  method: "post" | "get";
  midlware: RequestHandler;
};

export abstract class BaseController {
  private router: Router;
  private readonly statusCode = {
    'conflict': 409,
    'create': 201,
    'ok': 200,
    'unauthorized': 401,
  };

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const controllerData = this.getControllerData();
    for (let index = 0; index < controllerData.length; index++) {
      this.router[controllerData[index].method](
        controllerData[index].path,
        controllerData[index].midlware ,
        controllerData[index].func.bind(this)
      );
    }
  }

  public getRouter() {
    return this.router;
  }

  protected send(status: keyof typeof this.statusCode, res: Response, data?: any){
    res.status(this.statusCode[status]).send(data)
  }


  protected abstract getControllerData(): ControllerDataType[];
}
