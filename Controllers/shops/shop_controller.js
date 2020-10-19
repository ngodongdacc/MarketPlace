const Shop = require("../../Model/shop");
const async = require("async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const EscapeRegExp = require("escape-string-regexp");
const { isEmail, isPhone } = require("../../validator/validator");
const ShopService = require("../../Services/shopService");
const { success, error_500, error_400 } = require("../../validator/errors");
const { IsJsonString } = require("../../validator/validator");
const keySevice = require("../../Services/keySearchService");
const Products = require("../../Model/product");
const { param } = require("express-validator");
module.exports = {
    postshop: async (req, res, next) => {
        try {
            const { Phone, EmailOwner, PasswordShop, ShopName, BusinessRegisCode } = req.body
            if (!ShopName)
                return error_400(res, "Vui lòng nhập tên cửa hàng", "shop.ShopName");
            if (Phone && !isPhone(Phone))
                return error_400(res, "Số điện thoại không đúng định dạng", "shop.Phone");
            if (PasswordShop.length < 5)  // Kiểm tra password
                return error_400(res, "Mật khẩu phải lớn hơn 5 ký tự", "shop.Password");
            if (!EmailOwner) // Kiểm tra Email
                return error_400(res, "Vui lòng nhập email", "shop.EmailOwner");
            if (!isEmail(EmailOwner)) // Kiểm tra Email
                return error_400(res, "Vui lòng nhập đúng định dạng email", "shop.EmailOwner");
            if (!PasswordShop)  // Kiểm tra password
                return error_400(res, "Vui lòng nhập mật khẩu", "shop.Password");
            if (Phone && !isPhone(Phone))
                return error_400(res, "Vui lòng nhập đúng định dạng số điện thoại", "shop.Phone");
            if (!BusinessRegisCode)  // Kiểm tra password
                return error_400(res, "Vui lòng nhập mã số kinh doanh", "shop.BusinessRegisCode");
            const newOwnerShop = new Shop({
                StoreOwnername: req.body.StoreOwnername,
                Phone: req.body.Phone,
                EmailOwner: req.body.EmailOwner,
                PasswordShop: req.body.PasswordShop,
                ShopName: req.body.ShopName,
                BusinessRegisCode: req.body.BusinessRegisCode,
            })
            async.parallel([
                (cb) => {
                    // kiểm tra Username
                    if (ShopName)
                        ShopService.findOneOwnerShop(ShopName, (err, resUser) => {
                            if (err) cb(err)
                            else if (!resUser) cb(null, true)
                            else cb(null, false)
                        })
                    else cb(null, true)
                },
                (cb) => {// kiểm tra Email
                    if (EmailOwner)
                        ShopService.findEmail(EmailOwner, (err, resEmailUser) => {
                            if (err) cb(err)
                            else if (!resEmailUser) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

                (cb) => {// kiểm tra Phone
                    if (Phone)
                        ShopService.findPhone(Phone, (err, resPhone) => {
                            if (err) cb(err)
                            else if (!resPhone) cb(null, true);
                            else cb(null, false);
                        });
                    else cb(null, true);
                }
            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0])
                    return error_400(res, "Tên cửa hàng đã tồn tại", "shop.ShopName");
                if (!results[1])
                    return error_400(res, "Email đã tồn tại", "shop.EmailOwner");
                if (!results[2])
                    return error_400(res, "Số điện thoại đã tồn tại", "shop.Phone");
                ShopService.createShop(newOwnerShop, (err, user) => {
                    if (err) return error_500(res, err);
                    delete user.PasswordShop;
                    success(res, "Tạo cửa hàng thành công", user);
                });
            });
        } catch (e) {
            error_500(res, e)
        }
    },
    // Đăng nhập
    post_login: (req, res) => {
        const { Email, Password } = req.body
        if (!Email) // kiểm tra Username
            return error_400(res, "Vui lòng nhập Email", "shop.Email");
        if (!isEmail(Email))
            return error_400(res, "Email không đúng định dạng", "shop.Email");

        if (!Password)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập mật khẩu", "shop.Password");
        const userLogin = {
            EmailOwner: Email,
            PasswordShop: Password,
        }
        async.parallel([
            (cb) => Shop.findOne({ EmailOwner: userLogin.EmailOwner }, (e, user) => e ? cb(e) : cb(null, user)),
        ], (err, results) => {
            if (err)
                return error_500(res, err);
            if (!results[0])
                return error_400(res, "Email hoặc mật khẩu không đúng", "Email & Password");
            var shopTrue = results[0]

            ShopService.comparePassword(userLogin.PasswordShop, shopTrue.PasswordShop, (err, isMath) => {
                if (err) return error_400(res, "Tên đăng nhập hoặc mật khẩu không đúng", "Email & Password");
                if (isMath) {
                    var token = jwt.sign(shopTrue.toJSON(), process.env.secretKey,
                        { expiresIn: process.env.TimeToken || 60000000 });
                    success(res,
                        "Đăng nhập thành công",
                        {
                            shop: {
                                StoreOwnername: shopTrue.StoreOwnername,
                                EmailOwner: shopTrue.EmailOwner,
                                ShopName: shopTrue.ShopName,
                                Phone: shopTrue.Phone,
                                Country: shopTrue.Country,
                                CommodityIndustry: shopTrue.CommodityIndustry,
                                BusinessRegisCode: shopTrue.BusinessRegisCode,
                                IdShop: shopTrue._id,
                                RoleShop: shopTrue.RoleShop,
                            },
                            token: "Bearer " + token
                        })
                } else {
                    return error_400(res, "Email hoặc mật khẩu không đúng", "Emasil & Password");
                }
            })
        })
    },
    updateShop: async (req, res, next) => {
        let id = req.user._id;
        if (!id || id === "") return error_400(res,"Vui lòng nhập id","id")
        var shopUpdate = req.body;
        if (shopUpdate.PasswordShop === "") {
            if (shopUpdate.PasswordShop.length <= 5)  // Kiểm tra password
                return error_400(res, "Mật khẩu phải lớn hơn 5 ký tự", "shop.Password");
        }
        if (shopUpdate.ShopName === "") return error_400(res, "Vui lòng nhập tên cửa hàng", "shop.ShopName");
        if (shopUpdate.StoreOwnername === "") return error_400(res, "Vui lòng nhập tên chủ cửa hàng", "shop.StoreOwnerName");
        if (shopUpdate.BusinessRegisCode === "") return error_400(res, "Vui lòng nhập mã số kinh doanh", "shop.BusinessRegisCode");
        if (shopUpdate.Country === "") return error_400(res, "Vui lòng nhập địa chỉ kinh doanh", "shop.Country");
        if (shopUpdate.CommodityIndustry === "") return error_400(res, "Vui lòng tên nghành hàng hóa đăng ký kinh doanh", "shop.CommodityIndustry");
        if (shopUpdate.Phone && !isPhone(shopUpdate.Phone)) return error_400(res, "Số điện thoại không đúng định dạng", "shop.Phone");
        if (shopUpdate.EmailOwner && !isEmail(shopUpdate.EmailOwner)) return error_400(res, "Email không đúng định dạng", "shop.EmailOwner");

        Shop.findById(id, (err, resFindShop) => {
            if (err) return error_500(res, err);
            if (!resFindShop) return error_400(res, "Không tìm thấy cửa hàng", "Errors");
            async.parallel([
                (cb) => {// kiểm tra Phone
                    if (shopUpdate.Phone)
                        ShopService.findPhone(shopUpdate.Phone, (err, resPhone) => {
                            if (err) cb(err)
                            else if (!resPhone || (resPhone && resPhone._id.toString() === shopUpdate.id)) cb(null, true);
                            else cb(null, false);
                        });
                    else cb(null, true);
                },
                (cb) => {
                    // kiểm tra Shop Name
                    if (shopUpdate.ShopName)
                        ShopService.findOneOwnerShop(shopUpdate.ShopName, (err, resUpdateUser) => {
                            if (err) cb(err)
                            else if (!resUpdateUser || (resUpdateUser && resUpdateUser._id.toString() === shopUpdate.id)) cb(null, true);
                            else cb(null, false)
                        })
                    else cb(null, true)
                },
                (cb) => {
                    // kiểm tra Shop Name
                    if (shopUpdate.EmailOwner)
                        ShopService.findEmail(shopUpdate.EmailOwner, (err, resUpdateEmail) => {
                            if (err) cb(err)
                            else if (!resUpdateEmail || (resUpdateEmail && resUpdateEmail._id.toString() === shopUpdate.id)) cb(null, true);
                            else cb(null, false)
                        })
                    else cb(null, true)
                }
            ], (err, results) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!results[0]) return error_400(res, "Số điện thoại đã tồn tại", "shop.Phone");
                if (!results[1]) return error_400(res, "Tên cửa hàng đã tồn tại", "shop.ShopName");
                if (!results[2]) return error_400(res, "Email này đã tồn tại", "shop.EmailOwner");
                if (shopUpdate.PasswordShop) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(shopUpdate.PasswordShop, salt, async function (err, hash) {
                            shopUpdate.PasswordShop = hash;
                            Shop.findByIdAndUpdate(id, { $set: shopUpdate }, { new: true }, (err, resShop) => {
                                if (err) return error_500(res, err);
                                delete resShop.PasswordShop;
                                success(res, "Cập nhật cửa hàng thành công", resShop)
                            })
                        });
                    });
                } else {
                    Shop.findByIdAndUpdate(id, { $set: shopUpdate }, { new: true }, (err, resShop) => {
                        console.log(err);
                        if (err) return error_500(res, err);
                        delete resShop.PasswordShop;
                        success(res, "Cập nhật cửa hàng thành công", resShop)
                    })

                }

            });
        })
    }
    , deleteShop: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "ID không hợp lệ", "shop.id");
        ShopService.findOneUserByID(id, (err, resData) => {
            if (err) return error_500(res, err);
            if (!resData) return error_400(res, "Không tìm thấy cửa hàng", "Errors");
            ShopService.deleteShop(resData._id, (err, resRemoveShop) => {
                if (err) return error_500(res, err);
                success(res, "Xóa cửa hàng thành công", resRemoveShop)
            })
        })
    },
    delete_listShop: (req, res) => {
        const ListIdOwnerShop = req.body.ListId;
        if (!ListIdOwnerShop || (Array.isArray(ListIdOwnerShop) && ListIdOwnerShop.length === 0)) return res.status(400).json({ message: "Vui lòng chọn danh sách cần xóa", status: false });
        if (!Array.isArray(ListIdOwnerShop)) return res.status(400).json({ message: "ListId phải là Array", stutus: false });
        Shop.findOne({ _id: ListIdOwnerShop }, async (err, resDataShop) => {
            if (err) return error_500(res, err);
            if (!resDataShop) {
                return error_400(res, "Không tìm thấy cửa hàng", "Errors");
            } else {
                Shop.deleteMany({ _id: { $in: ListIdOwnerShop } })
                    .exec((err, resData) => {
                        if (err) return error_500(res, err);
                        success(res, `Xóa thành công ${resData.n} cửa hàng`, resData)
                    })
            }

        })
    }
    , getShop: (req, res) => {
        const config = {};
        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;
        async.parallel([
            (cb) => Shop
                .find({})
                .skip(config.skip)
                .limit(config.limit)
                .sort({ createdAt: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),
            (cb) => Shop.count().exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            if (err) if (err) return error_500(res, err);
            success(res,
                "Lấy danh sách cửa hàng thành công",
                {
                    shop: results[0],
                    count: results[1]
                })
        })
    },
    searchShop: async (req, res) => { // Tìm kiếm theo điều kiện yêu cầu: Id, tên, địa chỉ, nghành hàng
        let idUser = req.user._id;
        let params = req.query;

        if (!idUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");

        if (params.sort && !IsJsonString(params.sort))
            return error_500(res, "sort phải là dạng json", "sort");

        let limit = params.limit ? Number(params.limit) : process.env.LIMIT || 20
        let page = params.page ? Number(params.limit) : process.env.PAGE || 1
        let skip = (page - 1) * limit;
        let sort = params.sort ? JSON.parse(params.sort) : { CreateAt: -1 };

        let query = {
        };
        if (params.search && params.search !== "") {
            query.$or = [
                { $text: { $search: req.query.search } }
            ]
        }
        async.parallel([
            cb => Shop.aggregate([{ $match: query }])
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .exec((e, O) => e ? cb(e) : cb(null, O)),
            cb => Shop.countDocuments(query).exec((e, c) => e ? cb(e) : cb(null, c))
        ], (e, results) => {
            if (e) return error_500(res, e);
            success(res,
                "Lấy danh sách cửa hàng thành công",
                {
                    shop: results[0],
                    count: results[1]
                })
        })
    },
    shop_details_forIdOwnerShop: (req, res) => {
        let UserId = req.user._id;
        if (!UserId)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        Shop.findById({ _id: UserId }, (err, resShopDetail) => {
            if (err) return error_500(res, err);
            success(res, "Lấy thông tin cửa hàng thành công", resShopDetail)
        })
    }
}
module.exports.allowIfLoggedin = async (req, res, next) => {
    try {
        const shop = res.locals.loggedInUser;
        if (!shop)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.shop = shop;
        next();
    } catch (error) {
        next(error);
    }
}