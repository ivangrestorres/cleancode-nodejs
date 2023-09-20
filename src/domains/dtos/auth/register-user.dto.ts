export class RegisterUser {
    private constructor(public name: string, public email: string, public password: string) {}

    static create(object: { [key: string]: any }): [string?, RegisterUser?] {
        const { name, email, password } = object;

        if (!name) {
            return ["Name is required"];
        }

        if (!email) {
            return ["Email is required"];
        }

        if (!password) {
            return ["Password is required"];
        }

        if (password.length < 6) {
            return ["Password must be at least 6 characters"];
        }

        return [undefined, new RegisterUser(name, email, password)];
    }
}
