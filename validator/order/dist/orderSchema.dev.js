"use strict";

var joi = require("@hapi/joi");

var schema = {
  order: joi.object({
    Name: joi.string().max(100).required(),
    Address: joi.string().required(),
    Email: joi.string().email().required(),
    Phone: joi.number().integer().min(7).message("Invalid mobile number").max(12),
    CodeOrder: joi.string().required(),
    Reason: joi.string().required()
  })
};
module.exports = schema;