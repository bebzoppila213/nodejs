import bcrypt from "bcrypt";
import {generate } from "password-hash"
export class Cryptography{

    public static hashString(str: string,){
        return generate(str);
    }
}