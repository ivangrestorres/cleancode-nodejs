import { User } from "../../domains";

export class UserMapper {
    static userEntityFromObject(object: { [key: string]: any }) {
        const { id, _id, name, email, password, roles } = object;

        if (!id && !_id) throw new Error("Missing id");
        if (!name) throw new Error("Missing name");
        if (!email) throw new Error("Missing email");
        if (!password) throw new Error("Missing password");
        if (!roles || roles.length === 0) throw new Error("Missing roles");

        return new User(_id || id, name, email, password, roles);
    }
}
