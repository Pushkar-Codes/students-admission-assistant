import mongoose, { Schema } from "mongoose";

const StudentRegisterSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  schoolname: { type: String, required: true },
  currentclass: { type: String, required: true },

  phone: { type: String, required: true },
  havewhatsapp: { type: String, required: true },
  parentphone: { type: String, required: true },
  parentwhatsapp: { type: String, required: true },
});

export default mongoose.models.StudentRegister ||
  mongoose.model("StudentRegister", StudentRegisterSchema);
