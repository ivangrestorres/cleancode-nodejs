import { Request, Response } from "express";
import { AuthRespository, CustomError, LoginUser, RegisterUser, RegisterUserUseCaseImpl } from "../../domains";
import { JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { LoginUserUseCaseImpl } from "../../domains/usecases/auth/login-user.usecase";

export class AuthController {
    constructor(private readonly authRepository: AuthRespository) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    };

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUser] = RegisterUser.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }
        try {
            const registerUserCase = new RegisterUserUseCaseImpl(this.authRepository, await JWTAdapter.createToken);
            const registeredUser = await registerUserCase.execute(registerUser!);
            return res.json(registeredUser);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    loginUser = async (req: Request, res: Response) => {
        const [error, loginUser] = LoginUser.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }
        try {
            const loginUserCase = new LoginUserUseCaseImpl(this.authRepository, await JWTAdapter.createToken);
            const logedUser = await loginUserCase.execute(loginUser!);
            return res.json(logedUser);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await UserModel.find();
            res.json({ users, user: req.body.user });
        } catch (error) {
            this.handleError(error, res);
        }
    };
}
