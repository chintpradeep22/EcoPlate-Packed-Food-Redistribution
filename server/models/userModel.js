import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "user" },
    },
    { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("users", userSchema);
export default userModel;
