export class LoginUser {
    private constructor(public email: string, public password: string) {}

    static create(object: { [key: string]: any }): [string?, LoginUser?] {
        const { email, password } = object;

        if (!email) {
            return ["Email is required"];
        }

        if (!password) {
            return ["Password is required"];
        }

        return [undefined, new LoginUser(email, password)];
    }
}
