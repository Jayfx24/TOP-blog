import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { isValidPwd } from "../../../features/auth/passwordUtils.js";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  type VerifiedCallback,
  type StrategyOptions,
} from "passport-jwt";
import UserService from "../../../features/user/user.service.js";
import { rfTokenExtractor } from "../auth.middleware.js";
import type { JWTPayload } from "../type.js";

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

if (!jwtSecret || !refreshSecret) throw new Error("jwt secret not supplied");

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};
const refreshOpts: StrategyOptions = {
  jwtFromRequest: rfTokenExtractor,
  secretOrKey: refreshSecret,
};

const localConfig = {
  usernameField: "username",
  passwordField: "pwd",
  session: false,
};

const validateUser = async (payload: JWTPayload, done: VerifiedCallback) => {
  try {
    const user = await UserService.findUserById(payload.sub);

    if (!user) return done(new Error("user not found"));

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};
const local = new LocalStrategy(localConfig, async (username, pwd, done) => {
  try {
    const user = await UserService.findUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "user does not exists" });
    }
    const isValid = await isValidPwd(pwd, user.passwordHash);

    if (!isValid) {
      return done(null, false, { message: "Incorrect username or password" });
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
});

const verifyJwt = new JwtStrategy(jwtOptions, validateUser);
const verifyRefreshToken = new JwtStrategy(refreshOpts, validateUser);

passport.use(local);
passport.use(verifyJwt);
passport.use("jwt-refresh", verifyRefreshToken);
