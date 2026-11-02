import "./config/passport.js";
import "dotenv/config";
import jwt from "jsonwebtoken";


const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

if (!jwtSecret ) throw new Error("Access token  secret not supplied");
if ( !refreshSecret) throw new Error("Refresh token secret not supplied");
export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: "7d",
  });
};
