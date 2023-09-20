import { AuthDataSource, AuthRespository, LoginUser, RegisterUser, User } from "../../domains";

export class AuthRespositoryImpl implements AuthRespository {
    constructor(private readonly authDatasource: AuthDataSource) {}
    login(loginUser: LoginUser): Promise<User> {
        return this.authDatasource.login(loginUser);
    }

    register(registerUser: RegisterUser): Promise<User> {
        return this.authDatasource.register(registerUser);
    }
}
