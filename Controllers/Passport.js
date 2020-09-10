
var Passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const userService = require("../Services/usersService");

Passport.serializeUser((user, done) => {
    done(null, user)
})

Passport.deserializeUser(function (user, done) {
    done(null, user);
});


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.secretKey || "QTData-MarketPlace";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
Passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    userService.getUserById(jwt_payload._id, function(err, user) {
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
module.exports = Passport;