// model schema
const Users = require("../../Model/users");

// service
const usersService = require("../../Services/usersService");

// validator
const { error_400, error_500, success } = require("../../validator/errors");

module.exports = {

    // Đăng nhập bằng facebook
    login_facbook: (req, res) => {
        let user = req.user
        if (!user) return error_400(res, "Authorization", "access_token");

        if(user.email){
            Users.findOne({ "Email": user.email })
                .exec((e,u) => {
                    if(e) error_500(res, e);

                    if(u) {
                        u.Facebook = user;
                        u.DateUpdate = Date.now();
                        
                        Users.findOneAndUpdate(u._id,{$set: u}, {new: true})
                            .exec((e, upUser) => {
                                if(e) return error_500(res,e);

                                usersService.token_login(upUser,(result) => {
                                    success(res, "Đăng nhập thành công", result)
                                })
                            })
                    }
                })    
        } else if(user.phone){
            Users.findOne({ "Phone": user.phone })
                .exec((e,u) => {
                    if(e) error_500(res, e);

                    if(u) {
                        u.Facebook = user;
                        u.DateUpdate = Date.now();
                        
                        Users.findOneAndUpdate(u._id,{$set: u}, {new: true})
                            .exec((e, upUser) => {
                                if(e) return error_500(res,e);

                                usersService.token_login(upUser,(result) => {
                                    success(res, "Đăng nhập thành công", result)
                                })
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

                    let newUser = new Users({
                        FullName: user.name,
                        LastName: user.last_name,
                        FirstName: user.first_name,
                        Avatar: user.picture ? user.picture.data.url : "",
                        Email: user.id + "-qt.data@qtdata.com",
                        Facebook: user,
                        Password: user.id + "-qt.data@qtdata.com"
                    })

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

    }
}