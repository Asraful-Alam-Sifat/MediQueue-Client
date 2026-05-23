import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { clientPromise } from "@/lib/mongodb";

const db = (await clientPromise).db("mediqueue");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
        defaultValue: null,
        input: true, // ← this is the key line
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});