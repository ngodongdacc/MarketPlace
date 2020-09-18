const Shop = require("../Model/shop");
const jwt = require("jsonwebtoken");
const async = require("async");
const { isEmail } = require("../validator/validator");

const ShopService = require("../Services/shopService");

module.exports = {
    postshop: async (req, res, next) => {
        try {
            const { phone, emailOwner, passwordShop, shopName, businessRegisCode } = req.body
            if (!shopName)
                return res.status(400) // kiểm tra Usename
                    .json({
                        message: "Please enter your Shop name",
                        status: false,
                        code: 0
                    })
            if (passwordShop.length < 4)  // Kiểm tra password
                return res.status(400)
                    .json({
                        message: "Password must be greater than 4 characters in length",
                        status: false,
                        code: 0
                    })
            if (!businessRegisCode)
                return res.status(400) // kiểm tra Usename
                    .json({
                        message: "Please enter your Business Registration Code",
                        status: false,
                        code: 0
                    })
            if (phone.length < 9)  // Kiểm tra so dien thoai
                return res.status(400)
                    .json({
                        message: "Phone must be greater than 9 characters in length",
                        status: false,
                        code: 0
                    })
            if (!emailOwner)
                return res.status(400) // Kiểm tra Email
                    .json({
                        message: "Please enter your Email",
                        status: false,
                        code: 0
                    })
            if (!isEmail(emailOwner))
                return res.status(400) // Kiểm tra Email
                    .json({
                        message: "Email not format",
                        status: false,
                        code: 0
                    })

            if (!passwordShop)  // Kiểm tra password
                return res.status(400)
                    .json({
                        message: "Please enter your Password",
                        status: false,
                        code: 0
                    })
            const newOwnerShop = new Shop({
                storeOwnername: req.body.storeOwnername,
                phone: req.body.phone,
                emailOwner: req.body.emailOwner,
                passwordShop: req.body.passwordShop,
                shopName: req.body.shopName,
                businessRegisCode: req.body.businessRegisCode,
                businessLicense: req.body.businessLicense ? req.body.businessLicense : [1],
                country: req.body.country,
                chooseCatalog: req.body.chooseCatalog,
            })
            async.parallel([
                (cb) => {
                    // kiểm tra Username
                    if (shopName)
                        ShopService.findOneOwnerShop(shopName, (err, resUser) => {
                            if (err) cb(err)
                            else if (!resUser) cb(null, true)
                            else cb(null, false)
                        })
                    else cb(null, true)
                },
                (cb) => {// kiểm tra Email
                    if (emailOwner)
                        ShopService.findEmail(emailOwner, (err, resEmailUser) => {
                            if (err) cb(err)
                            else if (!resEmailUser) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },
                (cb) => {// kiểm tra Email
                    if (businessRegisCode)
                        ShopService.findBusinessRegisCode(businessRegisCode, (err, resBRC) => {
                            if (err) cb(err)
                            else if (!resBRC) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },
                (cb) => {// kiểm tra Phone
                    if (phone)
                        ShopService.findPhone(phone, (err, resPhone) => {
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
                if (!results[3]) return res.status(400).json({ message: "Phone already exists", status: false, code: 0 });

                ShopService.createShop(newOwnerShop, (err, user) => {
                    if (err) res.status(400).json({ message: "There was an error processing", errors: err, code: 0 });
                    return res.send({
                        message: "create account shop success",
                        data: {
                            storeOwnername: user.storeOwnername,
                            phone: user.phone,
                            emailOwner: user.emailOwner,
                            passwordShop: user.passwordShop,
                            businessLicense: user.businessLicense,
                            shopName: user.shopName,
                            businessRegisCode: user.businessRegisCode,
                            country: user.country,
                            chooseCatalog: user.chooseCatalog,
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
    updateShop: async (req, res, next) => {
        var userUpdate = {};
        if (req.body.storeOwnername) userUpdate.storeOwnername = req.body.storeOwnername;
        if (req.body.phone) userUpdate.phone = req.body.phone;
        if (req.body.emailOwner) userUpdate.emailOwner = req.body.emailOwner;
        if (req.body.passwordShop) userUpdate.passwordShop = req.body.passwordShop;
        if (req.body.businessLicense) userUpdate.businessLicense = req.body.businessLicense;
        if (req.body.businessRegisCode) userUpdate.businessRegisCode = req.body.businessRegisCode
        if (req.body.country) userUpdate.country = req.body.country
        if (req.body.chooseCatalog) userUpdate.chooseCatalog = req.body.chooseCatalog
        var id = req.params.id;
        const { phone, emailOwner, passwordShop, shopName, businessRegisCode } = req.body
        if (!shopName)
            return res.status(400) // kiểm tra Usename
                .json({
                    message: "Please enter your Shop name",
                    status: false,
                    code: 0
                })
        if (passwordShop.length < 4)  // Kiểm tra password
            return res.status(400)
                .json({
                    message: "Password must be greater than 4 characters in length",
                    status: false,
                    code: 0
                })
        if (!businessRegisCode)
            return res.status(400) // kiểm tra Usename
                .json({
                    message: "Please enter your Business Registration Code",
                    status: false,
                    code: 0
                })
        if (phone.length < 9)  // Kiểm tra so dien thoai
            return res.status(400)
                .json({
                    message: "Phone must be greater than 9 characters in length",
                    status: false,
                    code: 0
                })
        if (!emailOwner)
            return res.status(400) // Kiểm tra Email
                .json({
                    message: "Please enter your Email",
                    status: false,
                    code: 0
                })
        if (!isEmail(emailOwner))
            return res.status(400) // Kiểm tra Email
                .json({
                    message: "Email not format",
                    status: false,
                    code: 0
                })

        if (!passwordShop)  // Kiểm tra password
            return res.status(400)
                .json({
                    message: "Please enter your Password",
                    status: false,
                    code: 0
                })
        if (!id) return res.status(400).json({ message: "id is required", status: false, code: 0 })
        if (userUpdate.storeOwnername === "") return res.status(400).json({ message: "storeOwnername not null", status: false, code: 0 });
        if (userUpdate.emailOwner === "") return res.status(400).json({ message: "Email not null", status: false, code: 0 });
        if (userUpdate.phone === "") return res.status(400).json({ message: "Phone not null", status: false, code: 0 });
        ShopService.findOneUserByID(id, (err, resFindUser) => {
            if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "not find user", data: null, status: false });

            async.parallel([
                (cb) => {
                    // kiểm tra Username
                    if (userUpdate.phone)
                        ShopService.findPhone(userUpdate.phone, (err, resUserPhone) => {
                            console.log(userUpdate.phone)
                            if (err) cb(err)
                            else if (!resUserPhone || (resUserPhone && resUserPhone._id.toString() === id)) cb(null, true)
                            else cb(null, false)
                        })
                    else cb(null, true)
                }
            ], (err, results) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                if (!results[0]) return res.status(400).json({ message: "Phone already exists", status: false, code: 0 });
                // if (!results[1]) return res.status(400).json({ message: "Email already exists", status: false, code: 0 });
                // if (!results[2]) return res.status(400).json({ message: "Phone already exists", status: false, code: 0 });

                ShopService.updateShop(id, userUpdate, (err, resUser) => {
                    if (err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false });
                    res.json({
                        message: "update Shop success",
                        data: resUser,
                        status: true,
                        code: 1
                    });
                })

            });
        })


    }
    , deleteShop: async (req, res) => {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "id is required", status: false, code: 0 })
        ShopService.findOneUserByID(id, (err, resData) => {
            if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
            if(!resData) return res.status(400).json({ message: "Not find Category", errors: err, status: false});

            ShopService.deleteShop(resData._id, (err,resRemoveCate) => {
                if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
                res.json({
                    message: "Delete category success",
                    data: resRemoveCate,
                    status: true,
                    code: 1
                })
            })
        })
    }, getShop: async (req, res) => {
        var getShop = new Shop(req.params);
        ShopService.getShop(getShop, function (err, resData) {
            if (err) {
                return res.send({
                    message: "get Shop failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "get succsess",
                data: resData,
                status: true
            })
        })
    }, searchShop: async (req, res) => {
        var search = req.body.shopName
        ShopService.findShop(search, function (err, resData) {
            if (err) {
                return res.send({
                    message: "Seach Shop failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "Search succsess",
                data: resData,
                status: true
            })
        })
    }
}