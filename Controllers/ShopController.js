
const Shop = require("../Model/shop");
const ShopService = require("../Services/shopService");

const postshop = (req,res) => {
    // return res.send("ok")
    var newShop = new Shop(req.body);
    ShopService.createShop(newShop,function (err,resData) {


        if(err){
            return res.send({
                message: "create shop failed",
                data: null,
                errors: err.errors,
                code: 0,
                status: false,
              }).status(400)
        }

        res.send({
            message: "thêm shop thành công",
            data: resData
        })
    })
}

module.exports = {
    postshop
}