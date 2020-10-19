const passport = require("passport");
const RoleShop = require("../Model/roleShop");
const {error_400,error_500} = require("../validator/errors");
module.exports = {
   
    checkLogInShop: () => passport.authenticate('shop-jwt', { session: false }),

    checkRoleShop:(role) => { // kiểm tra quyền của shop
        return async (req, res, next) => {
            try {
                RoleShop.findOne({ Title: req.user.RoleShop})
                    .exec(async (e,r) =>{
                        if(e) {
                            return error_500(res,e);
                        } else if(!r) {
                            return error_400(res,"Bạn không có quyền để thực hiện chức năng này","RoleShop")
                        } else {
                            let index = r.RoleShops.findIndex(el => el === role)
                            if(index===-1) return error_400(res,"Bạn không có quyền thực hiện chức năng này", "RoleShop")
                            else next()
                        }
                    })
            } catch (error) {
             next(error)
            }
        }
    },

    check_is_admin_shop: () => { // kiểm tra là tài khoản admin (shop)
        return async (req,res,next) => {
            try {
                if(req.user.RoleShop === "admin") next();
                else error_400(res,"Bạn không có quyền thực hiện chức năng này","RoleShop")
            } catch (error) {
                next(error)
            }
        }
    }
}