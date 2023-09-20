import { LoginUser, RegisterUser } from "../dtos";
import { User } from "../entities";

export interface AuthDataSource {
    register(registerUser: RegisterUser): Promise<User>;
    login(loginUser: LoginUser): Promise<User>;
}
