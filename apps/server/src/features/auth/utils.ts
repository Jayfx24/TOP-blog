import "./config/passport.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET not defined");
}

export const generateJwt = (sub: number) =>
  jwt.sign({ sub }, secret, {
    expiresIn: "1h",
  });


  // MOVE