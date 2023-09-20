import { LoginUser, RegisterUser } from "../../dtos";
import { CustomError } from "../../errors";
import { UserToken } from "../../interfaces";
import { AuthRespository } from "../../repositories";

interface LoginUserUseCase {
    execute(registerUser: RegisterUser): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUserUseCaseImpl implements LoginUserUseCase {
    constructor(private readonly authRespository: AuthRespository, private readonly signToken: SignToken) {}

    async execute(loginUser: LoginUser): Promise<UserToken> {
        const user = await this.authRespository.login(loginUser);

        const token = await this.signToken({ id: user.id }, "2h");

        if (!token) {
            throw CustomError.internalServerError("Error creating token");
        }

        return {
            token,
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
            },
        };
    }
}
