import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import Admin from "../Models/Admin.js";
dotenv.config();
import dotenv from "dotenv";
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // find admin by id from token
      const admin = await Admin.findById(payload.id);

      if (!admin) {
        return done(null, false);
      }

      return done(null, admin);

    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;