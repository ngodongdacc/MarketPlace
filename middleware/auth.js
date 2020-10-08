const passport = require("passport");
const Role = require("../Model/role");
const RoleShop = require("../Model/roleShop");
const {error_400,error_500} = require("../validator/errors");
module.exports = {
    checkSignIn: () => passport.authenticate('jwt', { session: false }), // kiểm tra đăng nhập
    checkLogInShop: () => passport.authenticate('shop-jwt', { session: false }),
    checkRole:(role) => { // kiểm tra quyền
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
    },
    check_is_admin: () => { // kiểm tra là tài khoản admin
        return async (req,res,next) => {
            try {
                if(req.user.Role === "admin") next();
                else error_400(res,"Bạn không có quyền thực hiện chức năng này","Role")
            } catch (error) {
                next(error)
            }
        }
    },
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