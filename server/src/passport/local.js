const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const businessService = require('../services/businessService')

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, login_id, password, done) => {
        console.log(login_id)
        console.log(password)
        try {
        const business = await businessService.businessLogin(login_id, password);
          if (!business) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          }
          
          if (business) {
            return done(null, business);
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
