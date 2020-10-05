
var Passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const userService = require("../Services/usersService");
const shopService = require("../Services/shopService");

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
Passport.use("shop-jwt",new JwtStrategy(opts, function(jwt_payload, done) {
    
    shopService.findOneUserByID(jwt_payload._id, function(err, shop) {
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
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
module.exports = Passport;