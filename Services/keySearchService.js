const KeySearchs = require("../Model/keySearch");
const mongoose = require("mongoose");
module.exports = {    
    create_and_update_key : (key,cb) => {
        if(key.search && key.search !== ""){
            KeySearchs
                .findOne({Key: key.search})
                .exec(async (e,k) => {
                    if(e) cb(e); 
                    if(k){
                        if(key.idUser && key.idUser !== ""){  // Nếu truyền idUser
                            let index = await k.ListIdUser.findIndex(u => u.IdUser == key.idUser);    
                            if(index===-1) k.ListIdUser.push({IdUser: key.idUser, Counts: 1})  // nếu IdUser đã tìm từ khóa
                            else ++k.ListIdUser[index].Counts // IdUser chưa tìm từ khóa
                        }

                        KeySearchs
                            .findByIdAndUpdate(
                                k._id,
                                {$set: {
                                    CountSearch: ++k.CountSearch, 
                                    ListIdUser: await k.ListIdUser,
                                    UpdateAt: Date.now()
                                }},
                                {new: true}
                            ).exec((e,res)=>e?cb(e):cb(null,res))
                    } else {
                        let newKey = new KeySearchs({
                                Key: key.search,
                                ListIdUser: [{ 
                                    Counts: 1,
                                    IdUser: new mongoose.mongo.ObjectId(key.idUser)
                                }],
                        })
                        KeySearchs.create(newKey, (e,ck) => e?cb(e):cb(null,ck))       
                    }
                })
        } else cb(null, null)
    }
}