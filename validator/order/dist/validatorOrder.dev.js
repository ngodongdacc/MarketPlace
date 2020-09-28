"use strict";

var _require = require("./order.schema"),
    order = _require.order;

module.exports = {
  addOrderValidation: function addOrderValidation(req, res, next) {
    var value;
    return regeneratorRuntime.async(function addOrderValidation$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(order.validate(req.body));

          case 2:
            value = _context.sent;

            if (value.error) {
              res.json({
                success: 0,
                message: value.error.details[0].message
              });
            } else {
              next();
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};