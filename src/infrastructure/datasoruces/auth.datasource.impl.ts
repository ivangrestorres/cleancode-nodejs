import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { AuthDataSource, CustomError, LoginUser, RegisterUser, User } from "../../domains";
import { UserMapper } from "../mappers";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;
type UserMapperFunction = (object: { [key: string]: any }) => User;

export class AuthDataSourceImpl implements AuthDataSource {
    constructor(
        private readonly hashPassword: HashFunction,
        private readonly comparePassword: CompareFunction,
        private readonly userMapperFromObject: UserMapperFunction
    ) {}
    async login(loginUser: LoginUser): Promise<User> {
        const { email, password } = loginUser;

        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw CustomError.badRequest("Error al iniciar sesión");
            }

            const passwordMatch = this.comparePassword(password, user.password);

            if (!passwordMatch) {
                throw CustomError.badRequest("Error al iniciar sesión");
            }

            return this.userMapperFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }

    async register(registerUser: RegisterUser): Promise<User> {
        const { name, email, password } = registerUser;

        try {
            const emailExists = await UserModel.findOne({ email });

            if (emailExists) {
                throw CustomError.badRequest("Ha ocurrido un error al crear el usuario");
            }

            const hashedPassword = this.hashPassword(password);

            const user = await UserModel.create({ name, email, password: hashedPassword });

            await user.save();

            return this.userMapperFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }
}
