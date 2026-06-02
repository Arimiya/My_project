import mongoose from "mongoose";
import dns from "node:dns";

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is missing. Add it to backend/.env to connect MongoDB.");
    return false;
  }

  if (process.env.MONGODB_URI.includes("<db_password>")) {
    console.warn("MONGODB_URI still contains <db_password>. Replace it with your real MongoDB Atlas password.");
    return false;
  }

  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 3000,
  });
  console.log("MongoDB connected");
  return true;
}
