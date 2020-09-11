
const Shop = require("../Model/shop");
const ShopService = require("../Services/shopService");

const postshop = (req, res) => {
    // return res.send("ok")
    var newShop = new Shop(req.body);
    ShopService.createShop(newShop, function (err, resData) {


        if (err) {
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
const updateShop = async (req, res) => {
    var updateShop = new Shop(req.body);
    ShopService.updateShop(updateShop, function (err, resData) {
        if (err) {
            return res.send({
                message: "Update error",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "update success!",
            data: resData,
            status: true
        })
    });

}

const deleteShop = async (req, res) => {
    var deleteShop = new Shop(req.body);
    ShopService.deleteShop(deleteShop, function (err, resData) {
        if (err) {
            return res.send({
                message: "delete failse",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "delete success!",
            data: resData,
            status: true
        })
    })
}

const getShop = async (req, res) => {
    var getShop = new Shop(req.params);
    ShopService.getShop(getShop, function (err, resData) {
        if (err) {
            return res.send({
                message: "get Shop failse",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "get succsess",
            data: resData,
            status: true
        })
    })
}

const searchShop = async (req, res) => {
    var search = req.body.shopName
    ShopService.findShop(search, function (err, resData) {
        if (err) {
            return res.send({
                message: "Seach Shop failse",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "Search succsess",
            data: resData,
            status: true
        })
    })
}
module.exports = {
    postshop, updateShop, deleteShop, getShop, searchShop
}