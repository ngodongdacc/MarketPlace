"use strict";

var Order = require("../Model/order");

var async = require("async");

var Users = require("../Model/users");

var userServic = require("../Services/usersService");

var cartServie = require("../Services/cartService");

var _require = require("mongoose"),
    mongo = _require.mongo,
    Mongoose = _require.Mongoose;

var mongoose = require("mongoose");

var Product = require("../Model/product");

var _require2 = require("../Model/product"),
    count = _require2.count;

var order = require("../Model/order");

var Cart = require("../Model/cart");

var cartService = require("../Services/cartService");

var express = require("express");

var _require3 = require("../validator/validator"),
    isEmail = _require3.isEmail,
    isPhone = _require3.isPhone;

module.exports = {
  createOrder: function createOrder(req, res, next) {
    var IdCart = req.body.IdCart;
    var order = req.body;
    var UserId = req.body.UserId;
    var ProductId = req.body.ProductId;
    if (!UserId) return res.status(400).json({
      message: "Vui lòng nhập IdUser",
      status: false
    });
    if (order.Name === "") return res.status(400).json({
      message: "Tên không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Phone === "") return res.status(400).json({
      message: "SĐT không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Address === "") return res.status(400).json({
      message: "Địa chỉ không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Email === "") return res.status(400).json({
      message: "Email không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Payment === "") return res.status(400).json({
      message: "Email không được bỏ trống!",
      status: false,
      code: 0
    });
    if (!isEmail(order.Email)) return res.status(400).json({
      message: "Email not format",
      status: false,
      code: 0
    });
    if (!isPhone(order.Phone)) return res.status(400).json({
      message: "Phone not format",
      status: false,
      code: 0
    });

    try {
      Cart.findOne({
        _id: IdCart
      }, function _callee(err, resCart) {
        var UserCart, IdProduct, itemIndex;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: "Giỏ hàng không còn tồn tại",
                  errors: err,
                  status: false
                }));

              case 2:
                if (resCart) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.json({
                  message: "Không tìm thấy ID CART",
                  data: null,
                  status: false
                }));

              case 4:
                UserCart = resCart.UserId;
                IdProduct = resCart.ProductId;
                _context.next = 8;
                return regeneratorRuntime.awrap(resCart.ListProduct.findIndex(function (p) {
                  return p.IdProduct == ProductId;
                }));

              case 8:
                itemIndex = _context.sent;

                if (!(itemIndex <= -1)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: "Không có sản phẩm trong giỏ hàng",
                  data: null,
                  errors: err,
                  stutus: false
                }));

              case 13:
                if (UserId == UserCart) {
                  order.IntoMoney = resCart.SubPrice;
                  order.Products = resCart.ListProduct;
                  order.GrossProduct = resCart.SubTotal;
                  Order.create(order, function (err, resOrder) {
                    if (err) return res.status(400).json({
                      message: "Có lỗi trong quá trình xử lý",
                      errors: err,
                      status: false
                    });
                    resCart.ListProduct = [];
                    resCart.SubTotal = 0;
                    resCart.SubPrice = 0;
                    Cart.findOneAndUpdate({
                      _id: resCart._id
                    }, {
                      ListProduct: resCart.ListProduct,
                      SubPrice: resCart.SubPrice,
                      SubTotal: resCart.SubTotal
                    }, function (err, resDataCart) {
                      if (err) return res.status(400).json({
                        message: "Có lỗi trong quá trình xử lý",
                        errors: err,
                        status: false
                      });
                      res.json({
                        message: "Tạo đơn hàng thành công",
                        data: resOrder,
                        status: true
                      });
                    });
                  });
                } else {
                  res.json({
                    message: "Tạo đơn hàng thất bại",
                    errors: err,
                    status: 400
                  });
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    } catch (e) {
      res.send({
        message: e.message,
        errors: e.errors,
        code: 0
      }).status(500) && next(e);
    }
  },
  updateOrder: function updateOrder(req, res) {
    var order = req.body;
    order.DateUpdate = Date.now();
    var id = req.params.id;
    if (!id) return res.status(400).json({
      message: "Vui lòng nhập Id",
      status: false
    });
    if (order.Name === "") return res.status(400).json({
      message: "Tên không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Phone === "") return res.status(400).json({
      message: "SĐT không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Address === "") return res.status(400).json({
      message: "Địa chỉ không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Email === "") return res.status(400).json({
      message: "Email không được bỏ trống!",
      status: false,
      code: 0
    });
    if (order.Payment === "") return res.status(400).json({
      message: "Email không được bỏ trống!",
      status: false,
      code: 0
    });
    if (!isEmail(order.Email)) return res.status(400).json({
      message: "Email not format",
      status: false,
      code: 0
    });
    if (!isPhone(order.Phone)) return res.status(400).json({
      message: "Phone not format",
      status: false,
      code: 0
    });
    Order.findById(id, function (err, resOrder) {
      if (resOrder.Status === 1 || resOrder.Status === 2 || resOrder.Status === 3 || resOrder.Status === 4) return res.status(400).json({
        message: "Không thể update đơn hàng trong khi đã đang giao hàng và xác thực đơn hàng!",
        status: false,
        code: 0
      });
      if (err) return res.status(400).json({
        message: "Có lỗi trong quá trình xử lý",
        errors: err,
        status: false
      });
      if (!resOrder) return res.json({
        message: "Không tìm thấy id đơn hàng",
        data: null,
        status: false
      });
      Cart.findOne({
        _id: resOrder.IdCart
      }, function _callee2(err, resCart) {
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!err) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  message: "OOP Lỗi Rồi",
                  errors: err,
                  status: false
                }));

              case 2:
                if (resCart) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  message: "Không tìm thấy ID CART",
                  data: null,
                  status: false
                }));

              case 4:
                Order.findByIdAndUpdate(resOrder._id, {
                  $set: order,
                  "new": true
                }, {}, function (err, resUpdate) {
                  if (err) {
                    return res.status(400).json({
                      message: "Có lỗi trong quá trình xử lý",
                      errors: err,
                      status: false
                    });
                  } else {
                    res.json({
                      message: "Đơn hàng đang chờ xác nhận!",
                      data: resUpdate,
                      status: true
                    });
                  }
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
    });
  },
  getOrder: function getOrder(req, res) {
    var id;
    return regeneratorRuntime.async(function getOrder$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;

            if (id) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Vui lòng nhập Id",
              status: false
            }));

          case 3:
            Order.findById(id, function (err, resOrder) {
              if (err) return res.status(400).json({
                message: "Có lỗi trong quá trình xử lứ, vui lòng thử lại",
                er: err,
                status: false
              });
              if (!resOrder) return res.status(400).json({
                message: "Không tim thấy đơn hàng !",
                data: null,
                status: false
              });
              res.json({
                message: "Lấy chi tiết đơn hàng thành công",
                data: resOrder,
                status: true
              });
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  deleteOrder: function deleteOrder(req, res) {
    var id;
    return regeneratorRuntime.async(function deleteOrder$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;

            if (id) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "Vui lòng nhập Id",
              status: false
            }));

          case 3:
            Order.findById(id, function (err, resOrder) {
              if (err) return res.stutus(400).json({
                message: "OOp lỗi rồi",
                err: err,
                status: false
              });
              if (!resOrder) return res.stutus(400).json({
                message: "không tìm đc ID này, vui lòng thử lại",
                data: null,
                status: false
              });
              Order.findByIdAndRemove(resOrder._id, function (err, resData) {
                if (err) return res.status(400).json({
                  message: "Có lỗi trong quá trình xử lý",
                  errors: err,
                  status: false
                });
                res.json({
                  message: "Xóa sản phẩm thành công",
                  data: resData,
                  status: true
                });
              });
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  getOrderByIdUsers: function getOrderByIdUsers(req, res) {
    var config, query;
    return regeneratorRuntime.async(function getOrderByIdUsers$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            config = {};
            config.search = req.query.search || "";
            config.UserId = req.query.UserId;
            config.page = req.query.page ? Number(req.query.page) : 1;
            config.limit = req.query.limit ? Number(req.query.limit) : 20;
            config.skip = (config.page - 1) * config.limit;

            if (config.UserId) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              message: "Vui lòng nhập UserId",
              status: false
            }));

          case 8:
            query = {
              Name: {
                $regex: config.search,
                $options: "i"
              },
              UserId: new mongoose.mongo.ObjectId(config.UserId)
            };
            console.log(query);
            async.parallel([function (cb) {
              return Order.find(query).skip(config.skip).limit(config.limit).sort({
                Date: "desc"
              }).exec(function (e, data) {
                return e ? cb(e) : cb(null, data);
              });
            }, function (cb) {
              return Order.count(query).exec(function (e, data) {
                return e ? cb(e) : cb(null, data);
              });
            }], function (err, results) {
              // console.log(err);
              if (err) return res.status(400).json({
                message: "Có lỗi trong quá trình xử lý",
                errors: err,
                status: false
              });
              res.json({
                message: "Lấy danh sách order thành công",
                data: {
                  order: results[0],
                  count: results[1]
                },
                status: true
              });
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  getOrderByCart: function getOrderByCart(req, res) {
    var config, query;
    return regeneratorRuntime.async(function getOrderByCart$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = {};
            config.search = req.query.search || "";
            config.IdCart = req.query.IdCart;
            config.page = req.query.page ? Number(req.query.page) : 1;
            config.limit = req.query.limit ? Number(req.query.limit) : 20;
            config.skip = (config.page - 1) * config.limit;

            if (config.IdCart) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Vui lòng nhập Id Cart",
              status: false
            }));

          case 8:
            query = {
              Name: {
                $regex: config.search,
                $options: "i"
              },
              IdCart: new mongoose.mongo.ObjectId(config.IdCart)
            };
            console.log(query);
            async.parallel([function (cb) {
              return Order.find(query).skip(config.skip).limit(config.limit).sort({
                Date: "desc"
              }).exec(function (e, data) {
                return e ? cb(e) : cb(null, data);
              });
            }, function (cb) {
              return Order.count(query).exec(function (e, data) {
                return e ? cb(e) : cb(null, data);
              });
            }], function (err, results) {
              console.log(err);
              if (err) if (err) return res.status(400).json({
                message: "Có lỗi trong quá trình xử lý",
                errors: err,
                status: false
              });
              res.json({
                message: "Lấy danh sách đơn hàng thành công",
                data: {
                  order: results[0],
                  count: results[1]
                },
                status: true
              });
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  searchListOrderByShop: function searchListOrderByShop(req, res) {
    var config = {};
    config.search = req.query.search || "";
    config.IdShop = req.query.IdShop;
    config.page = req.query.page ? Number(req.query.page) : 1;
    config.limit = req.query.limit ? Number(req.query.limit) : 20;
    config.skip = (config.page - 1) * config.limit;
    if (!config.IdShop) return res.status(400).json({
      message: "Vui lòng nhập Id Shop",
      status: false
    });
    var query = {
      Name: {
        $regex: config.search,
        $options: "i"
      },
      IdShop: new mongoose.mongo.ObjectId(config.IdShop)
    };
    console.log(query);
    async.parallel([function (cb) {
      return Order.find(query).skip(config.skip).limit(config.limit).sort({
        Date: "desc"
      }).exec(function (e, data) {
        return e ? cb(e) : cb(null, data);
      });
    }, function (cb) {
      return Order.count(query).exec(function (e, data) {
        return e ? cb(e) : cb(null, data);
      });
    }], function (err, results) {
      console.log(err);
      if (err) if (err) return res.status(400).json({
        message: "Có lỗi trong quá trình xử lý",
        errors: err,
        status: false
      });
      res.json({
        message: "Lấy danh sách đơn hàng thành công",
        data: {
          order: results[0],
          count: results[1]
        },
        status: true
      });
    });
  },
  deleteListOrder: function deleteListOrder(req, res) {
    var ListIdOrder;
    return regeneratorRuntime.async(function deleteListOrder$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            ListIdOrder = req.body.ListId;

            if (!(!ListIdOrder || Array.isArray(ListIdOrder) && ListIdOrder.length === 0)) {
              _context8.next = 3;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              message: "Vui lòng chọn đơn hàng cần xóa",
              status: false
            }));

          case 3:
            if (Array.isArray(ListIdOrder)) {
              _context8.next = 5;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              message: "ListId phải là Array",
              stutus: false
            }));

          case 5:
            Order.findOne({
              _id: ListIdOrder
            }, function _callee3(err, resDataOrder) {
              return regeneratorRuntime.async(function _callee3$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!err) {
                        _context7.next = 2;
                        break;
                      }

                      return _context7.abrupt("return", res.status(400).json({
                        message: "Đơn hàng không còn tồn tại",
                        errors: err,
                        status: false
                      }));

                    case 2:
                      if (resDataOrder) {
                        _context7.next = 6;
                        break;
                      }

                      return _context7.abrupt("return", res.json({
                        message: "Không tìm thấy IdOrder",
                        data: resDataOrder,
                        status: false
                      }));

                    case 6:
                      Order.deleteMany({
                        _id: {
                          $in: ListIdOrder
                        }
                      }).exec(function (err, resData) {
                        if (err) if (err) return res.status(400).json({
                          message: "Có lỗi trong quá trình xử lý",
                          errors: err,
                          status: false
                        });
                        res.send({
                          message: "X\xF3a th\xE0nh c\xF4ng ".concat(resData.n, " \u0111\u01A1n h\xE0ng"),
                          data: resData,
                          status: true
                        });
                      });

                    case 7:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            });

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  updateStatusOrder: function updateStatusOrder(req, res) {
    var order, id;
    return regeneratorRuntime.async(function updateStatusOrder$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            order = req.body;
            order.DateUpdate = Date.now();
            id = req.params.id;

            if (id) {
              _context10.next = 5;
              break;
            }

            return _context10.abrupt("return", res.status(400).json({
              message: "Vui lòng nhập Id",
              status: false
            }));

          case 5:
            Order.findById(id, function (err, resOrder) {
              if (err) return res.status(400).json({
                message: "Có lỗi trong quá trình xử lý",
                errors: err,
                status: false
              });
              if (!resOrder) return res.json({
                message: "Không tìm thấy id đơn hàng",
                data: null,
                status: false
              });
              Cart.findOne({
                _id: resOrder.IdCart
              }, function _callee4(err, resCart) {
                return regeneratorRuntime.async(function _callee4$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!err) {
                          _context9.next = 2;
                          break;
                        }

                        return _context9.abrupt("return", res.status(400).json({
                          message: "OOP Lỗi Rồi",
                          errors: err,
                          status: false
                        }));

                      case 2:
                        if (resCart) {
                          _context9.next = 4;
                          break;
                        }

                        return _context9.abrupt("return", res.json({
                          message: "Không tìm thấy ID CART",
                          data: null,
                          status: false
                        }));

                      case 4:
                        Order.findByIdAndUpdate(resOrder._id, {
                          $set: order,
                          "new": true
                        }, {}, function (err, resUpdate) {
                          if (err) {
                            return res.status(400).json({
                              message: "Có lỗi trong quá trình xử lý",
                              errors: err,
                              status: false
                            });
                          } else if (resUpdate.Status == 1) {
                            res.json({
                              message: "Đơn hàng đã xác nhận ",
                              data: resUpdate,
                              status: true
                            });
                          } else if (resUpdate.Status == 2) {
                            res.json({
                              message: "Đang giao hàng",
                              data: resUpdate,
                              status: true
                            });
                          } else if (resUpdate.Status == 3) {
                            res.json({
                              message: "Đã giao hàng",
                              data: resUpdate,
                              status: true
                            });
                          } else if (resUpdate.Status == 4) {
                            if (resUpdate.Reason == "") {
                              return res.status(400).json({
                                message: "Vui lòng điền lý do bạn huỷ đơn hàng",
                                status: false,
                                code: 0
                              });
                            } else {
                              res.json({
                                message: "Huỷ đơn hàng",
                                data: resUpdate,
                                status: true
                              });
                            }
                          } else {
                            res.json({
                              message: "Đơn hàng đang chờ xác nhận!",
                              data: resUpdate,
                              status: true
                            });
                          }
                        });

                      case 5:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              });
            });

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    });
  }
};