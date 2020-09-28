const passport = require("passport");

module.exports = {
    checkSignIn: () => passport.authenticate('jwt', { session: false }),
    checkLogInShop: () => passport.authenticate('shop-jwt', { session: false })
}