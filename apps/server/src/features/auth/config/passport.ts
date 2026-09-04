import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { isValidPwd } from "#features/auth/passwordUtils.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserService from "#features/user/UserService.js";

const localConfig = {
  usernameField: "username",
  passwordField: "pwd",
  session: false,
};
const local = new LocalStrategy(localConfig, async (username, pwd, done) => {
  try {
    const user = await UserService.findUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "user does not exists" });
    }
    if (!isValidPwd(pwd, user.passwordHash)) {
      return done(null, false, { message: "Incorrect username or password" });
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
});

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET not defined");
}
const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwt = new JwtStrategy(jwtConfig, async (payload, done) => {
  try {
    const user = await UserService.findUserById(payload.id);

    if (!user) {
      return done(null, false, { message: "user does not exists" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(local);
passport.use(jwt);
