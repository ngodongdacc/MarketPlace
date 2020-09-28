const joi = require("@hapi/joi");

const schema = {
    order: joi.object({
        UserId: joi.string().required(),
        Products: joi.object().required(),
        Name: joi.string().max(100).required(),
        Address: joi.string().required(),
        Email: joi.string().email().required(),
        Phone: joi.number().integer().min(7).message("Invalid mobile number"),
        CodeOrder: joi.string().required(),
        Reason: joi.string()
    })
}

module.exports = schema;