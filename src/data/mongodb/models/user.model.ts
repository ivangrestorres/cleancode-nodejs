import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    roles: {
        type: [String],
        required: [true, "Role is required"],
        default: "USER_ROLE",
        enum: ["USER_ROLE", "ADMIN_ROLE"],
    },
    img: {
        type: String,
    },
});

export const UserModel = mongoose.model("User", UserSchema);
