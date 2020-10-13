
const Passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    FacebookStrategy = require('passport-facebook').Strategy;

// Models
const Users = require("../Model/users");

// Service
const shopService = require("../Services/shopService");

Passport.serializeUser((user, done) => {
    done(null, user)
})

Passport.deserializeUser(function (user, done) {
    done(null, user);
});


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.secretKey;

// JwtStrategy user
Passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

    Users.findById(jwt_payload._id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// JwtStrategy Shop
Passport.use("shop-jwt", new JwtStrategy(opts, function (jwt_payload, done) {

    shopService.findOneUserByID(jwt_payload._id, function (err, shop) {
        if (err) {
            return done(err, false);
        }
        if (shop) {
            return done(null, shop);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// JwtStrategy login facebook
Passport.use("facebook",new FacebookStrategy({
    clientID: "1074493309677220",//process.env.CLIENT_ID,
    clientSecret: "ed564c1108faf182a8e6118f0f1791ec"//process.env.CLIENT_SECRET,
    // callbackURL: process.env.callbackURL
  }, function (accessToken, refreshToken, profile, done) {
    // return res.send(profile)
    console.log("profile:: ",profile);
    return done(null, profile);
  }
));

module.exports = Passport;