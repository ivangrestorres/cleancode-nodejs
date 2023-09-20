import { LoginUser, RegisterUser } from "../dtos";
import { User } from "../entities";

export interface AuthRespository {
    register(registerUser: RegisterUser): Promise<User>;
    login(loginUser: LoginUser): Promise<User>;
}
