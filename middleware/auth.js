const passport = require("passport");
const Role = require("../Model/role");
const RoleShop = require("../Model/roleShop");
const { error_400, error_500, success } = require("../validator/errors");
const rq = require("request-promise");
module.exports = {

    // kiểm tra đăng nhập
    checkSignIn: () => passport.authenticate('jwt', { session: false }),


    // kiểm tra quyền
    checkRole: (role) => {
        return async (req, res, next) => {
            try {
                Role.findOne({ Title: req.user.Role })
                    .exec(async (e, r) => {
                        if (e) {
                            return error_500(res, e);
                        } else if (!r) {
                            return error_400(res, "Bạn không có quyền để thực hiện chức năng này", "Role")
                        } else {
                            let index = r.Roles.findIndex(el => el === role)
                            if (index === -1) return error_400(res, "Bạn không có quyền thực hiện chức năng này", "Role")
                            else next()
                        }
                    })
            } catch (error) {
                next(error)
            }
        }
    },

    // kiểm tra là tài khoản admin
    check_is_admin: () => {
        return async (req, res, next) => {
            try {
                if (req.user.Role === "admin") next();
                else error_400(res, "Bạn không có quyền thực hiện chức năng này", "Role")
            } catch (error) {
                next(error)
            }
        }
    },

    // Kiểm tra login facebook
    check_login_facebook: () => {
        return async (req, res, next) => {
            let token = req.body.access_token;

            if (!token || token === "") {
                return error_400(res, "Vui lòng nhập token", "access_token")
            }

            rq.get({
                uri: "https://graph.facebook.com/me",
                qs: {
                    access_token: token,
                    fields: "name,picture,first_name,last_name,email"
                },
                json: true
            }).then(result => {
                req.user = result;
                next();
            })
                .catch(e => {
                    if (e && e.error)
                        return error_400(res, "Đăng nhập thất bại", e.error)
                    error_500(res, "access_token");
                })
        }
    },

    // kiểm tra token đăng nhập bằng google  
    check_login_google: () => {
        return async (req, res, next) => {
            let token = req.body.access_token;

            if (!token || token === "") {
                return error_400(res, "Vui lòng nhập token", "access_token")
            }

            rq.get({
                uri: "https://www.googleapis.com/oauth2/v1/userinfo",
                qs: {
                    access_token: token,
                    alt: "json",
                },
                json: true
            }).then(result => {
                req.user = result;
                next();
            })
                .catch(e => {
                    if (e && e.error)
                        return error_400(res, "Đăng nhập thất bại", e.error)
                    error_500(res, "access_token");
                })

        }
    },

    // Kiểm tra đăng nhập bằng zalo
    check_login_zalo: () => {
        return (req, res, next) => {
            let { uid, code, scope } = req.body;

            // if(!uid) return error_400(res, "Vui lòng nhập uid", "uid"); 
            if (!code) return error_400(res, "Vui lòng nhập code", "code");
            if (!scope) return error_400(res, "Vui lòng nhập scope", "scope");

            rq.get({
                uri: "https://oauth.zaloapp.com/v3/access_token",
                qs: {
                    app_id: process.env.APP_ID_ZALO,
                    code: code,
                    app_secret: process.env.APP_SECRET_ZALO,
                    scope: scope
                },
                json: true
            }).then(result => {
                if(result && result.access_token) {
                    rq.get({
                        uri: "https://graph.zalo.me/v2.0/me",
                        qs: {
                            access_token: result.access_token,
                            fields:"id,birthday,name,gender,picture,phone"
                        },
                        json: true
                    })
                    .then(result => {
                        if(result && result.id){
                            req.user = result;
                            next()
                        } else {
                            return error_400(res, "Đăng nhập thất bại", result)
                        }
                    })
                    .catch(e => { 
                        console.log(e);
                        throw e })
                } else {
                    return error_400(res, "Đăng nhập thất bại", result)
                }
            })
            .catch(e => {
                console.log(e);
                throw e
            //     if(e && e.error)
            //         throw error_400(res,"Đăng nhập thất bại", e.error)
            //    throw error_500(res,e);
            })
        }
    }
}