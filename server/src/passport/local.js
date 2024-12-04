const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const businessService = require('../services/businessService');

passport.use(
    new LocalStrategy(async (login_id, password, cb) => {
        
        try {
            const business = await businessService.businessLogin(login_id, password);
            
            if (!business) {
                return cb(null, false, { message: '존재하지 않는 사업자입니다.' });
            }


            return cb(null, business);
        } catch (error) {
            return cb(error);
        }
    })
);

passport.serializeUser((user, done) => {
    console.log('serializeUser')
    console.log(user)
    process.nextTick(() => {
        done(null, { id: user.login_id, username: user.business_owner_name });
    });
});

passport.deserializeUser(async (user, done) => {
    console.log(user)
    console.log('deserializeUser')
    try {
        
        process.nextTick(() => {
            return done(null, user);
        });
    } catch (error) {
        return done(error);
    }
});

module.exports = passport;
