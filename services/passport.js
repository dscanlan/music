const passport = require('passport'),
User = require('../models/users'),
config=require('../config'),
JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt,
LocalStrategy = require('passport-local');

const localOptions = {
    usernameField: 'email'
}

const localLogin = new LocalStrategy(localOptions, (email, password, done) =>{
    User.findOne({email}, (err, user) =>{
        if(err){
            return done(err);
        }
        if(!user){
            return done (null, false);
        }
        
        user.comparePassword(password, (err, isMatch) => {
            if(err){
                return done(err);
            }
            if(!isMatch){
                return done (null, false);
            }
            done(null, user);
        });
    })
});

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) =>{
    User.findById(payload.sub, (err, user) => {
        if(err){
            return done(err);
        }
        if(!user){
            return done (null, false);
        }

        done(null, user);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);