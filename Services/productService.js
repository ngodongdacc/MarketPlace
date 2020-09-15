var Product = require("../Model/product");
module.exports={
    // Tìm kiếm product theo id 
getProductById : async (id,cb) => {
    try {         
       Product.findById(id,cb);
    } catch(e) {
      throw e
    }
  },
createProduct: async (product,cb) => {
    try {    
        Product.create(product, cb);
    } catch(e) {
      throw e
    }
  }
 
}