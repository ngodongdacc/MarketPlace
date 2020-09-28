"use strict";

var _require = require('express-validator'),
    check = _require.check;

var _require2 = require("../validator/validator"),
    validator = _require2.validator;

var validateCreateOrder = function validateCreateOrder() {
  return [check('order.Name', 'Name does not Empty').not().isEmpty(), check('order.Name', 'Name must be Alphanumeric').isAlphanumeric(), check('order.Name', 'Name more than 6 degits').isLength({
    min: 6
  }), check('order.Email', 'Invalid does not Empty').not().isEmpty(), check('order.Email', 'Invalid email').isEmail(), check('order.Phone', 'Phone does not Empty').not().isEmpty(), check('order.Phone', 'Invalid phone').isMobilePhone(), check('order.Address', 'Address does not Empty').not().isEmpty()];
};

var validate = {
  validateCreateOrder: validateCreateOrder
};
module.exports = {
  validate: validate
};