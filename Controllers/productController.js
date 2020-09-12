const Product = require("../Model/product");
const productService = require("../Services/productService");

module.exports = {
postcreateProduct : async (req, res, next) => {
    try {
      const { products, nameProducts, linkIcons } = req.body

      const newProduct = new Product({
        products: req.body.products,
        nameProducts: req.body.nameProducts,
        linkIcons: req.body.linkIcons,
      })

          productService.createProduct(newProduct, (err, product) => {
            if (err) res.status(400).json({ message: "There was an error processing",errors: err, code: 0 });
            return res.send({
              message: "create user success",
              data: {
                  products: product.products,
                  nameProducts: product.nameProducts,
                  linkIcons: product.linkIcons
              },
              code: 1,
              status: true
            })
          });
    } catch (e) {
      res.send({
        message: e.message,
        errors: e.errors,
        code: 0
      }).status(500) && next(e)
    }
  },

}