const passport = require("passport");
const Role = require("../Model/role");
const {error_400,error_500} = require("../validator/errors");
module.exports = {
    checkSignIn: () => passport.authenticate('jwt', { session: false }),
    checkLogInShop: () => passport.authenticate('shop-jwt', { session: false }),
    checkRole:(role) => {
        return async (req, res, next) => {
            try {
                Role.findOne({ Title: req.user.Role})
                    .exec(async (e,r) =>{
                       
                        if(e) {
                            return error_500(res,e);
                        } else if(!r) {
                            return error_400(res,"Bạn không có quyền để thực hiện chức năng này","Role")
                        } else {
                            let index = r.Roles.findIndex(el => el === role)
                            if(index===-1) return error_400(res,"Bạn không có quyền thực hiện chức năng này", "Role")
                            else next()
                        }
                    })
                   
            } catch (error) {
             next(error)
            }
    }
}
    
}