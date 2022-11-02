import bcrypt from "bcrypt";
import { uid } from "rand-token";
import { Cryptography } from "../common/Cryptography";
export class User {
  private password: string;
  private email: string;
  private name: string;
  private token: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  public hashPassword(password: string) {
    this.password = Cryptography.hashString(password);
  } 

  public getToken(){
    return this.token;
  }

  public createToken() {
    this.token = uid(30);
  }

  public getPassword() {
    return this.password;
  }

  toString() {
    return `${this.name} ${this.email} ${this.token} ${this.password}`;
  }

  public getAllData() {
    return {
      name: this.name,
      email: this.email,
      token: this.token,
      password: this.password,
    };
  }
}