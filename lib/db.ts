import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalForMongoose.mongooseCache ?? { conn: null, promise: null };
globalForMongoose.mongooseCache = cache;

export async function connectDB() {
  if (cache.conn) return cache.conn;
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI && process.env.NODE_ENV === "production") {
    throw new Error("MONGODB_URI is required in production");
  }
  const uri = MONGODB_URI || "mongodb://127.0.0.1:27017/pos_suite_sme";
  cache.promise ??= mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  cache.conn = await cache.promise;
  return cache.conn;
}
