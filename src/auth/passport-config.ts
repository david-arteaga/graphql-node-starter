import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { UserService } from '../api/UserService';
import { getInstanceDI } from '../di/di';
import { jwtOptions, JwtPayload } from './jwt-config';

const userService = getInstanceDI(UserService);

export const passportConfigureStrategies = () => {
  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload: JwtPayload, done) => {
      try {
        done(null, (await userService.findById(jwtPayload.id)) || false);
      } catch (e) {
        done(e, false);
      }
    }),
  );
};
