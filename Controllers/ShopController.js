const Shop = require("../Model/shop");
const async = require("async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { isEmail, isPhone } = require("../validator/validator");
const ShopService = require("../Services/shopService");
const { success, error_500, error_400 } = require("../validator/errors");
module.exports = {
    postshop: async (req, res, next) => {
        try {
            const { Phone, EmailOwner, PasswordShop, ShopName, BusinessRegisCode } = req.body
            if (!ShopName)
                return error_400(res, "Vui lòng nhập tên cửa hàng", "ShopName");
            if (Phone && !isPhone(Phone))
                return error_400(res, "Số điện thoại không đúng định dạng", "Phone");
            if (PasswordShop.length < 5)  // Kiểm tra password
                return error_400(res, "Mật khẩu phải lớn hơn 5 ký tự", "Password");
            if (!EmailOwner) // Kiểm tra Email
                return error_400(res, "Vui lòng nhập email", "Email");
            if (!isEmail(EmailOwner)) // Kiểm tra Email
                return error_400(res, "Vui lòng nhập đúng định dạng email", "Email");
            if (!PasswordShop)  // Kiểm tra password
                return error_400(res, "Vui lòng nhập mật khẩu", "Password");
            if (Phone && !isPhone(Phone))
                return error_400(res, "Vui lòng nhập đúng định dạng số điện thoại", "Phone");
            if (!BusinessRegisCode)  // Kiểm tra password
                return error_400(res, "Vui lòng nhập mã số kinh doanh", "BusinessRegisCode");
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
                if (err) return error_400(res, "Đã có lỗi xảy ra trong quá trình xử lý", "Errors");
                if (!results[0])
                    return error_400(res, "Tên cửa hàng đã tồn tại", "Name");
                if (!results[1])
                    return error_400(res, "Email đã tồn tại", "Email");
                if (!results[2])
                    return error_400(res, "Số điện thoại đã tồn tại", "Phone");
                ShopService.createShop(newOwnerShop, (err, user) => {
                    if (err) error_400(res, "Đã có lỗi xảy ra trong quá trình xử lý", "Errors");
                    delete user.PasswordShop;
                    return success(res, "Tạo cửa hàng thành công", user);
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
            return error_400(res, "Vui lòng nhập Email", "Email");
        if (!isEmail(Email))
            return error_400(res, "Email không đúng định dạng", "Email");

        if (!Password)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập mật khẩu", "Password");
        const userLogin = {
            EmailOwner: Email,
            PasswordShop: Password,
        }
        async.parallel([
            (cb) => Shop.findOne({ EmailOwner: userLogin.EmailOwner }, (e, user) => e ? cb(e) : cb(null, user)),
            (cb) => Shop.findOne({ PasswordShop: userLogin.PasswordShop }, (e, user) => e ? cb(e) : cb(null, user))
        ], (err, results) => {
            if (err)
                return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            if (!results[0] && !results[1])
                return error_400(res, "Email hoặc mật khẩu không đúng", "Email & Password");
            var shopTrue = results[0]
            if (!shopTrue) shopTrue = results[1];

            ShopService.comparePassword(userLogin.PasswordShop, shopTrue.PasswordShop, (err, isMath) => {
                if (err)
                    return error_400(res, "Tên đăng nhập hoặc mật khẩu không đúng", "Email & Password");
                if (isMath) {
                    var token = jwt.sign(shopTrue.toJSON(), process.env.secretKey || "QTData-MarketPlace", { expiresIn: process.env.TimeToken || 60000000 });
                    return res.json({
                        message: "Đăng nhập thành công",
                        data: {
                            shop: {
                                StoreOwnername: shopTrue.StoreOwnername,
                                EmailOwner: shopTrue.EmailOwner,
                                ShopName: shopTrue.ShopName,
                                Phone: shopTrue.Phone,
                                Country: shopTrue.Country,
                                CommodityIndustry: shopTrue.CommodityIndustry,
                                BusinessRegisCode: shopTrue.BusinessRegisCode,
                                IdShop: shopTrue._id
                            },
                            token: "Bearer " + token
                        },
                        code: 1,
                        status: true
                    })
                } else {
                    return error_400(res, "Email hoặc mật khẩu không đúng", "Emasil & Password");
                }
            })
        })
    },
    updateShop: async (req, res, next) => {
        var shopUpdate = {};
        if (req.body.ShopName) shopUpdate.ShopName = req.body.ShopName;
        if (req.body.StoreOwnername) shopUpdate.StoreOwnername = req.body.StoreOwnername;
        if (req.body.Phone) shopUpdate.Phone = req.body.Phone;
        if (req.body.EmailOwner) shopUpdate.EmailOwner = req.body.EmailOwner;
        if (req.body.PasswordShop) shopUpdate.PasswordShop = req.body.PasswordShop;
        if (req.body.BusinessRegisCode) shopUpdate.BusinessRegisCode = req.body.BusinessRegisCode;
        if (req.body.Country) shopUpdate.Country = req.body.Country;
        if (req.body.CommodityIndustry) shopUpdate.CommodityIndustry = req.body.CommodityIndustry;
        var id = req.params.id;
        if (!id) return res.status(400).json({ message: "ID Shop is required", status: false, code: 0 })
        const { Phone, EmailOwner, PasswordShop, ShopName, StoreOwnername, BusinessRegisCode, Country, CommodityIndustry } = req.body
        if (!ShopName)
            return error_400(res, "Vui lòng nhập tên cửa hàng", "Name");
        if (!StoreOwnername)
            return error_400(res, "Vui lòng nhập tên chủ cửa hàng", "Store Owner Name");
        if (PasswordShop.length < 5)  // Kiểm tra password
            return error_400(res, "Mật khẩu phải lớn hơn 5 ký tự", "Password");
        if (!EmailOwner)
            return error_400(res, "Vui lòng nhập Email", "Email");
        if (!isEmail(EmailOwner))
            return error_400(res, "Vui lòng nhập đúng định dạng email", "Email");
        if (!PasswordShop)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập mật khẩu", "Password");
        if (!Phone)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập số điện thoại", "Phone");
        if (!BusinessRegisCode)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập mã số kinh doanh", "BusinessRegisCode");
        if (!Country)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập địa chỉ kinh doanh", "Country");
        if (!CommodityIndustry)  // Kiểm tra password
            return error_400(res, "Vui lòng nhập tên nghành hàng hóa đăng ký kinh doanh", "CommodityIndustry");
        if (shopUpdate.StoreOwnername === "") return error_400(res, "Vui lòng nhập tên chủ cửa hàng", "Store Owner Name");
        if (shopUpdate.EmailOwner === "") return error_400(res, "Vui lòng nhập Email", "Email");
        if (shopUpdate.Phone === "") return error_400(res, "Vui lòng nhập số điện thoại", "Phone");
        if (shopUpdate.ShopName === "") return error_400(res, "Vui lòng nhập tên cửa hàng", "Name");
        if (shopUpdate.Phone && !isPhone(shopUpdate.Phone)) return error_400(res, "Số điện thoại không đúng định dạng", "Phone");


        Shop.findById(id, (err, resFindShop) => {
            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            if (!resFindShop) return error_400(res, "Không tìm thấy cửa hàng", "Errors");
            async.parallel([
                (cb) => {// kiểm tra Email
                    if (shopUpdate.EmailOwner)
                        ShopService.findEmail(shopUpdate.EmailOwner, (err, resEmailUser) => {
                            if (err) cb(err)
                            else if (!resEmailUser || (resEmailUser && resEmailUser._id.toString() === id)) cb(null, true);
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
                },
                (cb) => {
                    // kiểm tra Shop Name
                    if (ShopName)
                        ShopService.findOneOwnerShop(ShopName, (err, resUpdateUser) => {
                            if (err) cb(err)
                            else if (!resUpdateUser || (resUpdateUser && resUpdateUser._id.toString() === id)) cb(null, true);
                            else cb(null, false)
                        })
                    else cb(null, true)
                }
            ], (err, results) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!results[0]) return error_400(res, "Email đã tồn tại", "Email");
                if (!results[1]) return error_400(res, "Số điện thoại đã tồn tại", "Email");
                if (!results[2]) return error_400(res, "Tên cửa hàng đã tồn tại", "Name");
                if (shopUpdate.PasswordShop) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(shopUpdate.PasswordShop, salt, async function (err, hash) {
                            shopUpdate.PasswordShop = hash;
                            Shop.findByIdAndUpdate(id, { $set: shopUpdate }, { new: true }, (err, resShop) => {
                                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                                delete resShop.PasswordShop;
                                success(res, "Cập nhật cửa hàng thành công", resShop)
                            })
                        });
                    });
                } else {
                    ShopService.findByIdAndUpdate(id, { $set: shopUpdate }, { new: true }, (err, resShop) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                        delete resShop.PasswordShop;
                        success(res, "Cập nhật cửa hàng thành công", resShop)
                    })

                }

            });
        })
    }
    , deleteShop: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "ID không hợp lệ", "ID");
        ShopService.findOneUserByID(id, (err, resData) => {
            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            if (!resData) return error_400(res, "Không tìm thấy cửa hàng", "Errors");
            ShopService.deleteShop(resData._id, (err, resRemoveShop) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                success(res, "Xóa cửa hàng thành công", resRemoveShop)
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
                return error_400(res, "Không tìm thấy cửa hàng", "Errors");
            } else {
                Shop.deleteMany({ _id: { $in: ListIdOwnerShop } })
                    .exec((err, resData) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
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
            if (err) if (err)
                return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
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
    searchShop: async (req, res) => { // Tìm kiếm theo điều kiện yêu cầu: Id, tên, địa chỉ, nghành hàng
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
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
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
            error_500(res, e);
        }
    },
    shop_details_forIdOwnerShop: (req, res) => {
        const search = req.query.search;
        if (!search)
            return error_400(res, "ID không hợp lệ", "ID");

        Shop.findById({ _id: search }, (err, resShopDetail) => {
            if (err) {
                return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            }
            success(res, "Lấy thông tin cửa hàng thành công", resShopDetail)
        })
    }
}