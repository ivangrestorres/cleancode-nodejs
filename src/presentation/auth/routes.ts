import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRespositoryImpl, UserMapper } from "../../infrastructure";
import { BcryptAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDataSourceImpl(
            BcryptAdapter.hash,
            BcryptAdapter.compare,
            UserMapper.userEntityFromObject
        );
        const authRepository = new AuthRespositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        router.post("/login", controller.loginUser);
        router.post("/register", controller.registerUser);
        router.get("/", AuthMiddleware.validateJWT, controller.getUsers);

        return router;
    }
}
