

const AddressSchema = require("../Model/address");
const mongoose = require("mongoose");
const {success,error_500,error_400} = require("../validator/errors");
const {isPhone} = require("../validator/validator");
module.exports = {
    
    // Thêm địa chỉ mới
    add_address: (req,res) => {
        let {FullName,Phone,Company,NumAdress,Default,City,District,Wards, Address} = req.body
        
        if(!City || City === "") return error_400(res,"Vui lòng nhập vào thành phố","City");
        if(!District || District === "") return error_400(res,"Vui lòng nhập vào quận huyện","District");
        if(!Wards || Wards === "") return error_400(res,"Vui lòng nhập vào phường xã","Wards");
        if(!Address || Address === "") return error_400(res,"Vui lòng nhập vào địa chỉ","Address");

        if(Phone && !isPhone(Phone)) return error_400(res,"Số điện thoại không đúng định dạng","Phone");
        if(Default && typeof Default !== "boolean") return error_400(res,"Giá trị mặc định chỉ nhận true hoặc false","Default");
        
        AddressSchema.findOne({IdUser: req.user._id, Default: true},(e,f) => {
            if(e) return error_500(res,e);
            if(!f ){ // Thêm mới địa chỉ đầu tiên và đặt mặc định
                AddressSchema.create({IdUser: req.user._id,FullName,Phone,Company,NumAdress,Default: true,City,District,Wards, Address},(e,r)=>{
                    if(e) return error_500(res,e)
                    success(res,"Thêm địa chỉ thành công",r)
                })
            } 
            else if(f && Default){ // Thêm địa chỉ mới và làm mặc định
                AddressSchema.findByIdAndUpdate(f._id,{Default: false},(e,u)=> {
                    if(e) return error_500(res,e);
                    AddressSchema.create({IdUser: req.user._id,FullName,Phone,Company,NumAdress,Default,City,District,Wards, Address},(e,r)=>{
                        if(e) return error_500(res,e)
                        success(res,"Thêm địa chỉ thành công",r)
                    })
                })
            } else { // thêm địa chỉ mới và không đặt mặc định
                AddressSchema.create({IdUser: req.user._id,FullName,Phone,Company,NumAdress,Default: false,City,District,Wards, Address},(e,r)=>{
                    if(e) return error_500(res,e)
                    success(res,"Thêm địa chỉ thành công",r)
                })
            }
        })
    },

    // Cập nhật địa chỉ user
    update_address: (req,res) => {
        let {FullName,Phone,Company,NumAdress,Default,City,District,Wards, Address} = req.body
        let id = req.params.id
        
        if(!id || id === "") return error_400(res,"Vui lòng nhập vào id","id");
        if(id && !mongoose.Types.ObjectId.isValid(id)) return error_400(res,"Vui lòng nhập vào id đúng định dạng","ObjectId");
        if(City && City === "") return error_400(res,"Thành phố không nhận giá trị rỗng","City");
        if(District && District === "") return error_400(res,"Quận huyện không nhận giá trị rỗng","District");
        if(Wards && Wards === "") return error_400(res,"Phường xã không nhận giá trị rỗng","Wards");
        if(Address && Address === "") return error_400(res,"Địa chỉ không nhận giá trị rỗng","Address");

        if(Phone && !isPhone(Phone)) return error_400(res,"Số điện thoại không đúng định dạng","Phone");
        if(Default && typeof Default !== "boolean") return error_400(res,"Giá trị mặc định chỉ nhận true hoặc false","Default");
        
        AddressSchema.findById(id,(e,f) => {
            if(e) return error_500(res,e);
            if(!f ) return error_400(res,`Không tìm thấy địa chỉ của ${id}`,"id")
            // else if(f && Default === true && f.Default === true){ // địa chỉ đang là địa chỉ mặc định
            //     AddressSchema.findByIdAndUpdate(f._id,
            //         {IdUser: req.user._id,FullName,Phone,Company,NumAdress,Default,City,District,Wards, Address},
            //         { new : true},
            //         (e,u)=> {
            //             if(e) return error_500(res,e);
            //             success(res,"Cập nhật địa chỉ thành công",u)
            //         })
            // } 
            else if(f && Default === true){ // Cập nhật địa chỉ làm mặc định
                AddressSchema.update({"Default": true}, {"$set":{"Default": false}}, {"multi": true},)
                            .exec((e,u)=> {
                                if(e) error_500(res,e);
                                AddressSchema.findByIdAndUpdate(id,
                                                {FullName,Phone,Company,NumAdress,Default,City,District,Wards, Address},{new: true})
                                            .exec((e,u) => {
                                                if(e) error_500(res,e)
                                                success(res,"Cập nhật địa chỉ thành công",u)
                                            })  
                            })
            } else { // Cập nhật
                AddressSchema.findByIdAndUpdate(id,
                                {FullName,Phone,Company,NumAdress,Default,City,District,Wards, Address},{new: true})
                            .exec((e,u) => {
                                if(e) error_500(res,e)
                                success(res,"Cập nhật địa chỉ thành công",u)
                            })  
            }
        })
    },

    // xóa địa chỉ 
    remove_address: (req,res) => {
        let listId = req.query.listId;
        if(!listId )  return errorr_400(res,"Vui lòng nhập danh sách id", "listId");
        if(listId && !Array.isArray(listId)) return error_400(res,"danh sách id phải là Array", "listId");

        AddressSchema.deleteMany(listId, (e,r) =>{
            if(e) return error_500(res,e);
            AddressSchema.find({IdUser: req.user._id},(e,f)=> {
                if(e) return error_500(res,e);
                success(res,`Xóa thành công ${r.n} địa chỉ`,f)
            })
            
        })
    }
}