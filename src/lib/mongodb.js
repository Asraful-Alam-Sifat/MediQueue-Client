import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env');

// ── Mongoose connection (for your models) ──────────────────────────
let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'mediqueue',
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// ── Native MongoClient (for Better Auth) ──────────────────────────
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Reuse client across hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export { clientPromise };

// Add this after your existing clientPromise export
