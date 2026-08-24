import "#config/passport.js"
import "dotenv/config"
import jwt from "jsonwebtoken";
import passport from "passport";
import { type User } from "#generated/prisma/client.js";

const secret = process.env.JWT_SECRET
if (!secret) {
  throw new Error("JWT_SECRET not defined");
}
const generateJwt = (user:User) =>jwt.sign(user,secret,{
    expiresIn: '7d'
})