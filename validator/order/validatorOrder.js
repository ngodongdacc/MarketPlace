const { order } = require("./order.schema")

module.exports = {
  addOrderValidation: async (req, res, next) => {
    const value = await  order.validate(req.body);
    if( value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message
      })
    }else {
      next();
    }
  }
};