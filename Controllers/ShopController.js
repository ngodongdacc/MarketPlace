const Shop = require("../Model/shop");
const async = require("async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { isEmail, isPhone } = require("../validator/validator");
const ShopService = require("../Services/shopService");
const shopService = require("../Services/shopService");

module.exports = {
    postshop: (req, res, next) => {
        try {
            const { Phone, EmailOwner, PasswordShop, ShopName, BusinessRegisCode } = req.body
            if (!ShopName)
                return res.status(400) // kiểm tra Usename
                    .json({
                        message: "Please enter your Shop name",
                        status: false,
                        code: 0
                    })
            if (PasswordShop.length < 5)  // Kiểm tra password
                return res.status(400)
                    .json({
                        message: "Password must be greater than 5 characters in length",
                        status: false,
                        code: 0
                    })
            if (!BusinessRegisCode)
                return res.status(400) // kiểm tra Usename
                    .json({
                        message: "Please enter your Business Registration Code",
                        status: false,
                        code: 0
                    })
            if (Phone.length < 9)  // Kiểm tra so dien thoai
                return res.status(400)
                    .json({
                        message: "Phone Number must be greater than 9 characters in length",
                        status: false,
                        code: 0
                    })
            if (Phone.length > 11)  // Kiểm tra so dien thoai
                return res.status(400)
                    .json({
                        message: "Phone Number must be greater less than 10 characters long",
                        status: false,
                        code: 0
                    })
            if (!EmailOwner)
                return res.status(400) // Kiểm tra Email
                    .json({
                        message: "Please enter your Email",
                        status: false,
                        code: 0
                    })
            if (!isEmail(EmailOwner))
                return res.status(400) // Kiểm tra Email
                    .json({
                        message: "Email not format",
                        status: false,
                        code: 0
                    })

            if (!PasswordShop)  // Kiểm tra password
                return res.status(400)
                    .json({
                        message: "Please enter your Password",
                        status: false,
                        code: 0
                    })
            if (Phone && !isPhone(Phone)) return res.status(400).json({ message: "Số điện thoại không đúng định dạng", status: false, code: 0 });
            const newOwnerShop = new Shop({
                StoreOwnername: req.body.StoreOwnername,
                Phone: req.body.Phone,
                EmailOwner: req.body.EmailOwner,
                PasswordShop: req.body.PasswordShop,
                ShopName: req.body.ShopName,
                BusinessRegisCode: req.body.BusinessRegisCode,
                BusinessLicense: req.body.BusinessLicense ? req.body.BusinessLicense : [1],
                Country: req.body.Country,
                CommodityIndustry: req.body.CommodityIndustry,
            })
            async.parallel([
                (cb) => {
                    // kiểm tra Username
                    console.log(ShopName)
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
                (cb) => {// kiểm tra Email
                    if (BusinessRegisCode)
                        ShopService.findBusinessRegisCode(BusinessRegisCode, (err, resBRC) => {
                            if (err) cb(err)
                            else if (!resBRC) cb(null, true);
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
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err });
                if (!results[0]) return res.status(400).json({ message: "Shop Name already exists", status: false, code: 0 });
                if (!results[1]) return res.status(400).json({ message: "Email already exists", status: false, code: 0 });
                if (!results[2]) return res.status(400).json({ message: "Business Registration Code already exists", status: false, code: 0 });
                if (!results[3]) return res.status(400).json({ message: "Phone Number already exists", status: false, code: 0 });

                ShopService.createShop(newOwnerShop, (err, user) => {
                    if (err) res.status(400).json({ message: "There was an error processing", errors: err, code: 0 });
                    return res.send({
                        message: "create account shop success",
                        data: {
                            StoreOwnername: user.StoreOwnername,
                            Phone: user.Phone,
                            EmailOwner: user.EmailOwner,
                            BusinessLicense: user.BusinessLicense,
                            ShopName: user.ShopName,
                            BusinessRegisCode: user.BusinessRegisCode,
                            Country: user.Country,
                            CommodityIndustry: user.CommodityIndustry,
                        },
                        code: 1,
                        status: true
                    })
                });

            });

        } catch (e) {
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }

    },
    // Đăng nhập
    post_login: (req, res) => {
        const { Email, Password } = req.body

        if (!Email) // kiểm tra Username
            return res.status(400)
                .json({
                    message: "Vui lòng nhập Email",
                    status: false,
                    code: 0
                })
        if (!isEmail(Email))
            return res.status(400) // Kiểm tra Email
                .json({
                    message: "Email không đúng định dạng",
                    status: false,
                    code: 0
                })
        if (!Password)  // Kiểm tra password
            return res.status(400)
                .json({
                    message: "Vui lòng nhập mật khẩu",
                    status: false,
                    code: 0
                })
        const userLogin = {
            EmailOwner: Email,
            PasswordShop: Password,
        }
        async.parallel([
            (cb) => Shop.findOne({ EmailOwner: userLogin.EmailOwner }, (e, user) => e ? cb(e) : cb(null, user)),
            (cb) => Shop.findOne({ PasswordShop: userLogin.PasswordShop }, (e, user) => e ? cb(e) : cb(null, user))
        ], (err, results) => {
            if (err)
                return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });

            if (!results[0] && !results[1])
                return res.status(400).json({ message: "Email hoặc mật khẩu không đúng", status: false });

            var userTrue = results[0]
            if (!userTrue) userTrue = results[1];

            shopService.comparePassword(userLogin.PasswordShop, userTrue.PasswordShop, (err, isMath) => {
                if (err)
                    return res.status(400).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng", status: false, errors: "compare" });
                if (isMath) {
                    var token = jwt.sign(userTrue.toJSON(), process.env.secretKey || "QTData-MarketPlace", { expiresIn: process.env.TimeToken || 60000000 });
                    return res.json({
                        message: "Đăng nhập thành công",
                        data: {
                            user: {
                                StoreOwnername: userTrue.StoreOwnername,
                                EmailOwner: userTrue.EmailOwner,
                                ShopName: userTrue.ShopName,
                                Phone: userTrue.Phone,
                                Country: userTrue.Country,
                                CommodityIndustry: userTrue.CommodityIndustry,
                                BusinessRegisCode: userTrue.BusinessRegisCode,
                                IdShop: userTrue._id
                            },
                            token: "Bearer " + token
                        },
                        code: 1,
                        status: true
                    })
                } else {
                    return res.json({
                        message: "Email hoặc mật khẩu không đúng",
                        data: null,
                        code: 0,
                        status: false
                    }).status(400)
                }
            })
        })
    },
    updateShop: (req, res, next) => {
        var shopUpdate = {};
        if (req.body.ShopName) shopUpdate.ShopName = req.body.ShopName;
        if (req.body.StoreOwnername) shopUpdate.StoreOwnername = req.body.StoreOwnername;
        if (req.body.Phone) shopUpdate.Phone = req.body.Phone;
        if (req.body.EmailOwner) shopUpdate.EmailOwner = req.body.EmailOwner;
        if (req.body.PasswordShop) shopUpdate.PasswordShop = req.body.PasswordShop;
        var id = req.params.id;
        if (!id) return res.status(400).json({ message: "ID Shop is required", status: false, code: 0 })
        const { Phone, EmailOwner, PasswordShop, ShopName, StoreOwnername } = req.body
        if (!ShopName)
            return res.status(400) // kiểm tra Usename
                .json({
                    message: "Please enter your Shop name",
                    status: false,
                    code: 0
                })
        if (!StoreOwnername)
            return res.status(400) // kiểm tra StoreOwnername
                .json({
                    message: "Please enter your Store Owner name",
                    status: false,
                    code: 0
                })
        if (PasswordShop.length < 5)  // Kiểm tra password
            return res.status(400)
                .json({
                    message: "Password must be greater than 4 characters in length",
                    status: false,
                    code: 0
                })
        if (Phone.length < 9)  // Kiểm tra so dien thoai
            return res.status(400)
                .json({
                    message: "Phone Number must be greater than 9 characters in length",
                    status: false,
                    code: 0
                })
        if (Phone.length > 11)  // Kiểm tra so dien thoai
            return res.status(400)
                .json({
                    message: "Phone Number must be greater less than 10 characters long",
                    status: false,
                    code: 0
                })
        if (!EmailOwner)
            return res.status(400) // Kiểm tra Email
                .json({
                    message: "Please enter your Email",
                    status: false,
                    code: 0
                })
        if (!isEmail(EmailOwner))
            return res.status(400) // Kiểm tra Email
                .json({
                    message: "Email not format",
                    status: false,
                    code: 0
                })

        if (!PasswordShop)  // Kiểm tra password
            return res.status(400)
                .json({
                    message: "Please enter your Password",
                    status: false,
                    code: 0
                })

        if (shopUpdate.StoreOwnername === "") return res.status(400).json({ message: "StoreOwnername not null", status: false, code: 0 });
        if (shopUpdate.EmailOwner === "") return res.status(400).json({ message: "Email not null", status: false, code: 0 });
        if (shopUpdate.Phone === "") return res.status(400).json({ message: "Phone Number not null", status: false, code: 0 });
        if (shopUpdate.ShopName === "") return res.status(400).json({ message: "Shop Name not null", status: false, code: 0 });
        if (shopUpdate.Phone && !isPhone(shopUpdate.Phone)) return res.status(400).json({ message: "Số điện thoại không đúng định dạng", status: false, code: 0 });
        Shop.findById(id, (err, resFindShop) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
            if (!resFindShop) return res.status(400).json({ message: "not find shop", data: null, status: false });

            async.parallel([
                (cb) => {// kiểm tra Email
                    if (shopUpdate.Email)
                        ShopService.findEmail(shopUpdate.Email, (err, resEmailUser) => {
                            if (err) cb(err)
                            else if (!resEmailUser || (resEmailUser && resEmailUser._id.toString()) === id) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },
                (cb) => {// kiểm tra Phone
                    if (shopUpdate.Phone)
                        ShopService.findPhone(shopUpdate.Phone, (err, resPhone) => {
                            if (err) cb(err)
                            else if (!resPhone || (resPhone && resPhone._id.toString() === id)) cb(null, true);
                            else cb(null, false);
                        });
                    else cb(null, true);
                }
            ], (err, results) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                if (!results[0]) return res.status(400).json({ message: "Email already exists", status: false, code: 0 });
                if (!results[1]) return res.status(400).json({ message: "Phone already exists", status: false, code: 0 });
                if (shopUpdate.PasswordShop) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(shopUpdate.PasswordShop, salt, async function (err, hash) {
                            shopUpdate.PasswordShop = hash;
                            Shop.findByIdAndUpdate(id, shopUpdate, (err, resShop) => {
                                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                delete resShop.PasswordShop;
                                res.json({
                                    message: "Cập nhật thành công",
                                    data: resShop,
                                    status: true,
                                    code: 1
                                });
                            })
                        });
                    });
                } else {
                    ShopService.updateShop(id, shopUpdate, (err, resShop) => {
                        if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                        res.json({
                            message: "Cập nhật thành công",
                            data: resShop,
                            status: true,
                            code: 1
                        });
                    })

                }

            });
        })
    }
    , deleteShop: (req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "id is required", status: false, code: 0 })
        ShopService.findOneUserByID(id, (err, resData) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
            if (!resData) return res.status(400).json({ message: "Not find OwnetShop", errors: err, status: false });

            ShopService.deleteShop(resData._id, (err, resRemoveCate) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                res.json({
                    message: "Delete ownershop success",
                    data: resRemoveCate,
                    status: true,
                    code: 1
                })
            })
        })
    },
    delete_listShop: (req, res) => {
        const ListIdOwnerShop = req.body.ListId;
        if (!ListIdOwnerShop || (Array.isArray(ListIdOwnerShop) && ListIdOwnerShop.length === 0)) return res.status(400).json({ message: "Vui lòng chọn danh sách cần xóa", status: false });
        if (!Array.isArray(ListIdOwnerShop)) return res.status(400).json({ message: "ListId phải là Array", stutus: false });
        Shop.findOne({ _id: ListIdOwnerShop }, async (err, resDataShop) => {
            if (err) return res.status(400).json({ message: "Cửa hàng này không còn tồn tại", errors: err, status: false });
            if (!resDataShop) {
                return res.json({ message: "Không tìm thấy Id Shop", data: resDataShop, status: false })
            } else {
                Shop.deleteMany({ _id: { $in: ListIdOwnerShop } })
                    .exec((err, resData) => {
                        if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                        res.send({
                            message: `Xóa thành công ${resData.n} cửa hàng`,
                            data: resData,
                            status: true
                        })
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
            if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            res.json({
                message: "Lấy danh sách cửa hàng thành công",
                data: {
                    shop: results[0],
                    count: results[1],
                },
                status: true
            })
        })
    },
    searchShop: (req, res) => { // Tìm kiếm theo điều kiện yêu cầu: Id, tên, địa chỉ, nghành hàng
        try {
            const config = {};
            config.Country = req.query.Country
            config.StoreOwnername = req.query.StoreOwnername
            config.ShopName = req.query.ShopName
            config.CommodityIndustry = req.query.CommodityIndustry
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;

            const query = {
                ShopName: { $regex: config.ShopName, $options: "i" },
                CommodityIndustry: { $regex: config.CommodityIndustry, $options: "i" },
                Country: { $regex: config.Country, $options: "i" },
                StoreOwnername: { $regex: config.StoreOwnername, $options: "i" }
            }
            async.parallel([
                (cb) =>
                    Shop.find(query)
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({ ShopName: "desc" })
                        .exec((e, resDataSearch) => e ? cb(e) : cb(null, resDataSearch)),
                (cb) => Shop.count(query)
                    .exec((e, resDataSearch) => e ? cb(e) : cb(null, resDataSearch))
            ], (err, results) => {
                if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Lấy danh sách sản phẩm thành công",
                    data: {
                        shop: results[0],
                        count: results[1],
                    },
                    status: true
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({
                    message: "lỗi hệ thống",
                    errors: error,
                    status: 500
                })
        }
    },
    shop_details_forIdOwnerShop: (req, res) => {
        const search = req.query.search;
        if (!search)  // Kiểm tra so dien thoai
            return res.status(400)
                .json({
                    message: "Id Shop is required",
                    status: false,
                    code: 0
                })

        Shop.findById({ _id: search }, (err, resShopDetail) => {
            if (err) {
                return res.send({
                    message: "get Comment failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "get succsess",
                data: resShopDetail,
                status: true
            })
        })
    }
}