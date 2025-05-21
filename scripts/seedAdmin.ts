import mongoose from "mongoose";
import { hash } from "bcryptjs";
import User from "../models/User";

const MONGODB_URI =
  "mongodb+srv://Pushkar-Dutta:mcaminiproject@cluster0.qvohxla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    const exists = await User.findOne({ email: "adminactive@gmail.com" });

    if (exists) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashed = await hash("1234admin", 10);
    await User.create({
      email: "adminactive@gmail.com",
      password: hashed,
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

run();
