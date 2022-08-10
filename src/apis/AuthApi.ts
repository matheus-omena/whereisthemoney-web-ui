import { LoginModel } from "../models/Auth/LoginModel";
import { RegisterModel } from "../models/Auth/RegisterModel";
import _ApiBase from "./_ApiBase";

export class AuthApi {
   register(data: RegisterModel): Promise<any> {
      const r = _ApiBase.post('/auth/register', data);      
      return r;
   }

   login(data: LoginModel): Promise<any> {      
      const r = _ApiBase.post('/auth/login', data);      
      return r;
   }
}
