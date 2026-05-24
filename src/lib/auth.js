// src/lib/auth.js
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("mediqueue")),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
    },
  },
   databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Check if this is an OAuth-created user
          if (user.emailVerified) {
            // OAuth users are auto email-verified
            // Check if they came from login page via a flag
            // We'll handle this differently
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true,
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});