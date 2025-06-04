import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String }, // Added name field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "staff", "student"], required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
