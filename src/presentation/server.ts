import express, { Router } from "express";

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(option: Options) {
        this.port = option.port;
        this.routes = option.routes;
        console.log("Server created");
    }

    async start(): Promise<void> {
        // Middlewares
        this.app.use(express.json()); // Aceptamos application/json
        this.app.use(express.urlencoded({ extended: true })); // Aceptamos x-www-form-urlencoded

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
