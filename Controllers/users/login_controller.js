const async = require("async");
const moment = require("moment");

// model schema
const Users = require("../../Model/users");

// service
const usersService = require("../../Services/usersService");

// validator
const { error_400, error_500, success } = require("../../validator/errors");

module.exports = {

    // Đăng nhập bằng facebook
    facbook_login: (req, res) => {
        let user = req.user
        if (!user) return error_400(res, "Authorization", "access_token");

        let newUser = new Users({
            FullName: user.name,
            LastName: user.last_name,
            FirstName: user.first_name,
            Avatar: user.picture ? user.picture.data.url : "",
            Facebook: user
        })

        if (user.email) {
            Users.findOne({ "Email": user.email })
                .exec((e, u) => {
                    if (e) error_500(res, e);

                    if (u) {
                        u.Facebook = user;
                        u.DateUpdate = Date.now();

                        Users.findByIdAndUpdate(u._id, { $set: u }, { new: true })
                            .exec((e, upUser) => {
                                if (e) return error_500(res, e);

                                usersService.token_login(upUser, (result) => {
                                    success(res, "Đăng nhập thành công", result)
                                })
                            })
                    } else {

                        newUser.Email = user.id + "-qt.data@qtdata.com";
                        newUser.Password = user.id + "-qt.data@qtdata.com";

                        // Tạo mới user
                        usersService.createUser(newUser, (e, resNew) => {
                            if (e) error_500(res, e)

                            // Trả về token
                            usersService.token_login(resNew, (resToken) => {
                                return success(res, "Đăng nhập thành công", resToken);
                            });
                        })
                    }
                })
        } else if (user.phone) {
            Users.findOne({ "Phone": user.phone })
                .exec((e, u) => {
                    if (e) error_500(res, e);

                    if (u) {
                        u.Facebook = user;
                        u.DateUpdate = Date.now();

                        Users.findByIdAndUpdate(u._id, { $set: u }, { new: true })
                            .exec((e, upUser) => {
                                if (e) return error_500(res, e);

                                usersService.token_login(upUser, (result) => {
                                    success(res, "Đăng nhập thành công", result)
                                })
                            })
                    } else {
                        newUser.Phone = user.phone
                        newUser.Email = user.id + "-qt.data@qtdata.com";
                        newUser.Password = user.id + "-qt.data@qtdata.com";
                        // Tạo mới user
                        usersService.createUser(newUser, (e, resNew) => {
                            if (e) error_500(res, e)

                            // Trả về token
                            usersService.token_login(resNew, (resToken) => {
                                return success(res, "Đăng nhập thành công", resToken);
                            });
                        })
                    }
                })
        } else {
            Users.findOne({ "Facebook.id": user.id })
                .exec((e, resUser) => {
                    if (e) return error_500(res, e)

                    if (resUser) {
                        usersService.token_login(resUser, (resToken) => {
                            return success(res, "Đăng nhập thành công", resToken);
                        });
                    } else {

                        // Tạo mới user
                        usersService.createUser(newUser, (e, resNew) => {
                            if (e) error_500(res, e)

                            // Trả về token
                            usersService.token_login(resNew, (resToken) => {
                                return success(res, "Đăng nhập thành công", resToken);
                            });
                        })
                    }
                })
        }

    },

    // Đăng nhập bằng google
    google_login: (req, res) => {
        let user = req.user

        if (!user) return error_400(res, "Authorization", "access_token");

        let newUser = new Users({
            FullName: user.name,
            LastName: user.family_name,
            FirstName: user.given_name,
            Avatar: user.picture ? user.picture : "",
            Email: user.email,
            Google: user,
            Password: user.email
        })

        async.parallel([
            cb => {
                Users.findOne({ "Email": user.email })
                    .exec((e, u) => {
                        if (e) cb(e)
                        if (u) {
                            if (u.Google === null) {
                                u.Google = user;
                                u.DateUpdate = Date.now();

                                Users.findByIdAndUpdate(u._id, u, { new: true })
                                    .exec((e, upUser) => e ? cb(e) : cb(null, upUser))
                            } else {
                                cb(null, u)
                            }
                        } else {
                            // Tạo mới user
                            usersService.createUser(newUser, (e, resNew) => {
                                if (e) cb(e);
                                cb(null, resNew);
                            })
                        }
                    })

            }
        ], (e, result) => {
            if (e) error_500(res, e);

            // Trả về token
            usersService.token_login(result[0], (resToken) => {
                return success(res, "Đăng nhập thành công", resToken);
            });
        })


        //res.send(user);
    },

    // Đăng nhập bằng zalo
    zalo_login: (req, res) => {
        let user = req.user;
        if (!user || user === null || user === "" ) 
            return error_400(res, "Vui lòng đăng nhập", "authention");
        
        Users.findOne({ "Zalo.id": user.id })
            .exec((e, fUser) => {
                if (e) return error_500(res, e);

                if (fUser) {
                    usersService.token_login(fUser, (loginUser) => {
                        return success(res, "Đăng nhập thành công", loginUser)
                    })
                } else {
                    let newUser = new Users({
                        FullName: user.name,
                        Avatar: (user.picture && user.picture.data &&
                            user.picture.data.url) ? user.picture.data.url : "",
                        Gender: user.gender === "female" ? 0 :
                            user.gender === "male" ? 1 : null,
                        Birthday: user.birthday ? 
                            moment(user.birthday, "DD/MM/YYYY").add(1,"days") : null,
                        Zalo: user,
                        Email: user.id + "-qt.data@qtdata.com",
                        Password: user.id + "-qt.data@qtdata.com"
                    })

                    // create user
                    usersService.createUser(newUser,(e,resUser) => {
                        if(e) return error_500(res,e);

                        // token
                        usersService.token_login(resUser,(resToken) => {
                            success(res,"Đăng nhập thành công",resToken)
                        })
                    })
                }
            })
    }
}