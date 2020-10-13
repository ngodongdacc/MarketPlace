const passport = require("passport");
const Role = require("../Model/role");
const RoleShop = require("../Model/roleShop");
const {error_400,error_500, success} = require("../validator/errors");
const rq = require("request-promise");
module.exports = {
    checkSignIn: () => passport.authenticate('jwt', { session: false }), // kiểm tra đăng nhập
    check_login_facebook: () => {
       return async (req,res,next) => {
            let token = req.body.access_token
            if(!token || !token){
                return error_400(res,"Vui lòng nhập token","access_token")
            }

            rq.get({
                uri: "https://graph.facebook.com/me",
                qs: {
                    access_token: token // -> uri + '?access_token=xxxxx%20xxxxx'
                },
                json: true
            }).then(result =>{
                success(res,"thành công", result)
            })
        }
    },
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