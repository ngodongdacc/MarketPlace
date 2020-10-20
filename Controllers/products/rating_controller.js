const async = require("async");
const RatingModel = require("../../Model/Rating");
const mongoose = require("mongoose");

const { error_400, error_500, success } = require("../../validator/errors");
module.exports = {
    
    // xếp hạng sản phẩm
    add_rating : (req,res) => {
        let ranting = req.body;
        let IdUser = req.user._id;

        if(!ranting.IdProduct || ranting.IdProduct === ""){
            return error_400( res, "Vui lòng nhập vào id sản phẩm", "IdProduct");
        }

        if(ranting.IdProduct && !mongoose.Types.ObjectId.isValid(ranting.IdProduct)){
            return error_400( res, "Id sản phẩm không đúng định dạng", "IdProduct");
        }

        if(!IdUser || IdUser === ""){
            return error_400( res, "Vui lòng nhập vào id người dùng", "IdUser");
        }

        if(IdUser && !mongoose.Types.ObjectId.isValid(IdUser)){
            return error_400( res, "Id người dùng không đúng định dạng", "IdUser");
        }

        if(!ranting.Star || ranting.Star === ""){
            return error_400( res, "Vui lòng nhập vào xếp hạng", "Star");
        }

        if(ranting.Star && (!Number(ranting.Star) === "NaN" 
            || Number(ranting.Star) < 1 || Number(ranting.Star) > 5 )) {
                return error_400( res, "Xếp hạng nhập giá trị 1 đến 5");
        }

        RatingModel.findOne({
            IdProduct   : new mongoose.mongo.ObjectId(ranting.IdProduct),
            IdUser      : new mongoose.mongo.ObjectId(IdUser)
        }).exec((e,resFindRa) => {
            if(e) return error_500(res,e);

            if(resFindRa) return error_400(res, "Bạn đã đánh giá rồi", "Rated");
            
            let newRating = new RatingModel({
                Star        : ranting.Star,
                IdProduct   : ranting.IdProduct,
                IdUser      : IdUser,
            })
    
            newRating.save(( e, resNew ) => e ? error_500( res, e) : 
                success(res,`Thêm đánh giá thành công`, resNew));
        });
    },

    // Lấy xếp hạng sản phẩm
    counts_rating_product: (req, res) => {
        let IdProduct = req.query.idProduct;

        if(!IdProduct || IdProduct === "") {
            return error_400(res, "Vui lòng nhập vào id sản phẩm", "idProduct")
        }
        
        if(IdProduct && !mongoose.Types.ObjectId.isValid(IdProduct)) {
            return error_400(res, "id sản phẩm không đúng định dạng", "ObjectId")
        }

        async.parallel([
            cb => RatingModel.countDocuments({
                    Star        : 5,
                    IdProduct   : new mongoose.mongo.ObjectId(IdProduct)
                }).exec( (e,c) => e ? cb(e) : cb(null, c)),
            cb => RatingModel.countDocuments({
                    Star        : 4,
                    IdProduct   : new mongoose.mongo.ObjectId(IdProduct)
                }).exec( (e,c) => e ? cb(e) : cb(null, c)),
            cb => RatingModel.countDocuments({
                    Star        : 3,
                    IdProduct   : new mongoose.mongo.ObjectId(IdProduct)
                }).exec( (e,c) => e ? cb(e) : cb(null, c)),
            cb => RatingModel.countDocuments({
                    Star        : 2,
                    IdProduct   : new mongoose.mongo.ObjectId(IdProduct)
                }).exec( (e,c) => e ? cb(e) : cb(null, c)),
            cb => RatingModel.countDocuments({
                    Star        : 1,
                    IdProduct   : new mongoose.mongo.ObjectId(IdProduct)
                }).exec( (e,c) => e ? cb(e) : cb(null, c)),
        ], (e, results) => {
            if(e) return error_500(res, e);

            success(res, "Lấy danh sách xếp hạng thành công", {counts: results})
        })
        
    }

}