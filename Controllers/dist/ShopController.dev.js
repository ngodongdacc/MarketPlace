"use strict";

var Shop = require("../Model/shop");

var jwt = require("jsonwebtoken");

var async = require("async");

var _require = require("../validator/validator"),
    isEmail = _require.isEmail;

var ShopService = require("../Services/shopService");

module.exports = {
  postshop: function postshop(req, res, next) {
    var _req$body, phone, emailOwner, passwordShop, shopName, businessRegisCode, newOwnerShop;

    return regeneratorRuntime.async(function postshop$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, phone = _req$body.phone, emailOwner = _req$body.emailOwner, passwordShop = _req$body.passwordShop, shopName = _req$body.shopName, businessRegisCode = _req$body.businessRegisCode;

            if (shopName) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400) // kiểm tra Usename
            .json({
              message: "Please enter your Shop name",
              status: false,
              code: 0
            }));

          case 4:
            if (!(passwordShop.length < 4)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Password must be greater than 4 characters in length",
              status: false,
              code: 0
            }));

          case 6:
            if (businessRegisCode) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400) // kiểm tra Usename
            .json({
              message: "Please enter your Business Registration Code",
              status: false,
              code: 0
            }));

          case 8:
            if (!(phone.length < 9)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Phone must be greater than 9 characters in length",
              status: false,
              code: 0
            }));

          case 10:
            if (emailOwner) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400) // Kiểm tra Email
            .json({
              message: "Please enter your Email",
              status: false,
              code: 0
            }));

          case 12:
            if (isEmail(emailOwner)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400) // Kiểm tra Email
            .json({
              message: "Email not format",
              status: false,
              code: 0
            }));

          case 14:
            if (passwordShop) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Please enter your Password",
              status: false,
              code: 0
            }));

          case 16:
            newOwnerShop = new Shop({
              storeOwnername: req.body.storeOwnername,
              phone: req.body.phone,
              emailOwner: req.body.emailOwner,
              passwordShop: req.body.passwordShop,
              shopName: req.body.shopName,
              businessRegisCode: req.body.businessRegisCode,
              businessLicense: req.body.businessLicense ? req.body.businessLicense : [1],
              country: req.body.country,
              chooseCatalog: req.body.chooseCatalog
            });
            async.parallel([function (cb) {
              // kiểm tra Username
              if (shopName) ShopService.findOneOwnerShop(shopName, function (err, resUser) {
                if (err) cb(err);else if (!resUser) cb(null, true);else cb(null, false);
              });else cb(null, true);
            }, function (cb) {
              // kiểm tra Email
              if (emailOwner) ShopService.findEmail(emailOwner, function (err, resEmailUser) {
                if (err) cb(err);else if (!resEmailUser) cb(null, true);else cb(null, false);
              });else cb(null, true);
            }, function (cb) {
              // kiểm tra Email
              if (businessRegisCode) ShopService.findBusinessRegisCode(businessRegisCode, function (err, resBRC) {
                if (err) cb(err);else if (!resBRC) cb(null, true);else cb(null, false);
              });else cb(null, true);
            }, function (cb) {
              // kiểm tra Phone
              if (phone) ShopService.findPhone(phone, function (err, resPhone) {
                if (err) cb(err);else if (!resPhone) cb(null, true);else cb(null, false);
              });else cb(null, true);
            }], function (err, results) {
              if (err) return res.status(400).json({
                message: "There was an error processing",
                errors: err
              });
              if (!results[0]) return res.status(400).json({
                message: "Shop Name already exists",
                status: false,
                code: 0
              });
              if (!results[1]) return res.status(400).json({
                message: "Email already exists",
                status: false,
                code: 0
              });
              if (!results[2]) return res.status(400).json({
                message: "Business Registration Code already exists",
                status: false,
                code: 0
              });
              if (!results[3]) return res.status(400).json({
                message: "Phone already exists",
                status: false,
                code: 0
              });
              ShopService.createShop(newOwnerShop, function (err, user) {
                if (err) res.status(400).json({
                  message: "There was an error processing",
                  errors: err,
                  code: 0
                });
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
                    chooseCatalog: user.chooseCatalog
                  },
                  code: 1,
                  status: true
                });
              });
            });
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](0);
            res.send({
              message: _context.t0.message,
              errors: _context.t0.errors,
              code: 0
            }).status(500) && next(_context.t0);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 20]]);
  },
  updateShop: function updateShop(req, res, next) {
    var userUpdate, id, _req$body2, phone, emailOwner, passwordShop, shopName, businessRegisCode;

    return regeneratorRuntime.async(function updateShop$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userUpdate = {};
            if (req.body.storeOwnername) userUpdate.storeOwnername = req.body.storeOwnername;
            if (req.body.phone) userUpdate.phone = req.body.phone;
            if (req.body.emailOwner) userUpdate.emailOwner = req.body.emailOwner;
            if (req.body.passwordShop) userUpdate.passwordShop = req.body.passwordShop;
            if (req.body.businessLicense) userUpdate.businessLicense = req.body.businessLicense;
            if (req.body.businessRegisCode) userUpdate.businessRegisCode = req.body.businessRegisCode;
            if (req.body.country) userUpdate.country = req.body.country;
            if (req.body.chooseCatalog) userUpdate.chooseCatalog = req.body.chooseCatalog;
            id = req.params.id;
            _req$body2 = req.body, phone = _req$body2.phone, emailOwner = _req$body2.emailOwner, passwordShop = _req$body2.passwordShop, shopName = _req$body2.shopName, businessRegisCode = _req$body2.businessRegisCode;

            if (shopName) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(400) // kiểm tra Usename
            .json({
              message: "Please enter your Shop name",
              status: false,
              code: 0
            }));

          case 13:
            if (!(passwordShop.length < 4)) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Password must be greater than 4 characters in length",
              status: false,
              code: 0
            }));

          case 15:
            if (businessRegisCode) {
              _context2.next = 17;
              break;
            }

            return _context2.abrupt("return", res.status(400) // kiểm tra Usename
            .json({
              message: "Please enter your Business Registration Code",
              status: false,
              code: 0
            }));

          case 17:
            if (!(phone.length < 9)) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Phone must be greater than 9 characters in length",
              status: false,
              code: 0
            }));

          case 19:
            if (emailOwner) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("return", res.status(400) // Kiểm tra Email
            .json({
              message: "Please enter your Email",
              status: false,
              code: 0
            }));

          case 21:
            if (isEmail(emailOwner)) {
              _context2.next = 23;
              break;
            }

            return _context2.abrupt("return", res.status(400) // Kiểm tra Email
            .json({
              message: "Email not format",
              status: false,
              code: 0
            }));

          case 23:
            if (passwordShop) {
              _context2.next = 25;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Please enter your Password",
              status: false,
              code: 0
            }));

          case 25:
            if (id) {
              _context2.next = 27;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "id is required",
              status: false,
              code: 0
            }));

          case 27:
            if (!(userUpdate.storeOwnername === "")) {
              _context2.next = 29;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "storeOwnername not null",
              status: false,
              code: 0
            }));

          case 29:
            if (!(userUpdate.emailOwner === "")) {
              _context2.next = 31;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Email not null",
              status: false,
              code: 0
            }));

          case 31:
            if (!(userUpdate.phone === "")) {
              _context2.next = 33;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Phone not null",
              status: false,
              code: 0
            }));

          case 33:
            ShopService.findOneUserByID(id, function (err, resFindUser) {
              if (err) return res.status(400).json({
                message: "There was an error processing",
                errors: err,
                status: false
              });
              if (!resFindUser) return res.status(400).json({
                message: "not find user",
                data: null,
                status: false
              });
              async.parallel([function (cb) {
                // kiểm tra Username
                if (userUpdate.phone) ShopService.findPhone(userUpdate.phone, function (err, resUserPhone) {
                  console.log(userUpdate.phone);
                  if (err) cb(err);else if (!resUserPhone || resUserPhone && resUserPhone._id.toString() === id) cb(null, true);else cb(null, false);
                });else cb(null, true);
              }], function (err, results) {
                if (err) return res.status(400).json({
                  message: "There was an error processing",
                  errors: err,
                  status: false
                });
                if (!results[0]) return res.status(400).json({
                  message: "Phone already exists",
                  status: false,
                  code: 0
                }); // if (!results[1]) return res.status(400).json({ message: "Email already exists", status: false, code: 0 });
                // if (!results[2]) return res.status(400).json({ message: "Phone already exists", status: false, code: 0 });

                ShopService.updateShop(id, userUpdate, function (err, resUser) {
                  if (err) return res.status(400).json({
                    message: "There was an error processing",
                    errors: err,
                    status: false
                  });
                  res.json({
                    message: "update Shop success",
                    data: resUser,
                    status: true,
                    code: 1
                  });
                });
              });
            });

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  deleteShop: function deleteShop(req, res) {
    var id;
    return regeneratorRuntime.async(function deleteShop$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;

            if (id) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "id is required",
              status: false,
              code: 0
            }));

          case 3:
            ShopService.findOneUserByID(id, function (err, resData) {
              if (err) return res.status(400).json({
                message: "There was an error processing",
                errors: err,
                status: false
              });
              if (!resData) return res.status(400).json({
                message: "Not find Category",
                errors: err,
                status: false
              });
              ShopService.deleteShop(resData._id, function (err, resRemoveCate) {
                if (err) return res.status(400).json({
                  message: "There was an error processing",
                  errors: err,
                  status: false
                });
                res.json({
                  message: "Delete category success",
                  data: resRemoveCate,
                  status: true,
                  code: 1
                });
              });
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  getShop: function getShop(req, res) {
    var getShop;
    return regeneratorRuntime.async(function getShop$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            getShop = new Shop(req.params);
            ShopService.getShop(getShop, function (err, resData) {
              if (err) {
                return res.send({
                  message: "get Shop failse",
                  errors: err,
                  status: false
                }).status(400);
              }

              res.send({
                message: "get succsess",
                data: resData,
                status: true
              });
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  searchShop: function searchShop(req, res) {
    var search;
    return regeneratorRuntime.async(function searchShop$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            search = req.body.shopName;
            ShopService.findShop(search, function (err, resData) {
              if (err) {
                return res.send({
                  message: "Seach Shop failse",
                  errors: err,
                  status: false
                }).status(400);
              }

              res.send({
                message: "Search succsess",
                data: resData,
                status: true
              });
            });

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};