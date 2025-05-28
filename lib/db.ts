import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI loaded:", MONGODB_URI); // Debugging line

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in your .env file");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  try {
    cached.conn = await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}
