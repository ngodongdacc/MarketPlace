const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Address = require("../Model/address");
const addressCtr = require("../Controllers/users/address_controller");
const {checkSignIn} = require("../middleware/auth");
const {error_400} = require("../validator/errors");

 check_is_role_or_admin = ()=>{
    return async (req, res, next) => {
        try {
            console.log("user:: ", req.user._id);
            if(!req.params.id || req.params.id === "") return error_400(res,"Vui lòng nhập vào id", "id");
            if(req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) return error_400(res,"Vui lòng nhập vào id đúng định dạng", "ObjectId");
                Address.findById(req.params.id)
                    .exec((e,f)=>{
                        if(e) next(e)
                        if(!f) return error_400(res,`Không tìm thấy địa chỉ ${req.params.id}`,"id")
                        console.log("add:: ", f.IdUser);
                        if(req.user.Role === "admin") next()
                        else if( String(f.IdUser) !==  String(req.user._id)) return error_400(res,"Bạn không có quyền thực hiện chức năng này","Role")
                        else next()
                    })
        } catch (error) {
            next(error)
        }
}}

router.post("/",checkSignIn(), addressCtr.add_address);
router.post("/update/:id",checkSignIn(),check_is_role_or_admin(), addressCtr.update_address);
router.post("/delete/:id",checkSignIn(),check_is_role_or_admin() , addressCtr.delete_address);
router.post("/remove/list",checkSignIn(), addressCtr.remove_address);
router.get("/search",checkSignIn(), addressCtr.search_address);

module.exports = router;