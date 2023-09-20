import { RegisterUser } from "../../dtos";
import { User } from "../../entities";
import { CustomError } from "../../errors";
import { UserToken } from "../../interfaces";
import { AuthRespository } from "../../repositories";

interface RegisterUserUseCase {
    execute(registerUser: RegisterUser): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
    constructor(private readonly authRespository: AuthRespository, private readonly signToken: SignToken) {}

    async execute(registerUser: RegisterUser): Promise<UserToken> {
        const user = await this.authRespository.register(registerUser);

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
