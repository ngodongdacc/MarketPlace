const mongosse = require("mongoose");
const Schema = mongosse.Schema;

const AddresSchema = new Schema({
    IdUser: {type: mongosse.Types.ObjectId},
    FullName: {type: String},
    Phone: {type: String},
    Company: {type: String},
    City: {type: String, required: true},
    District: {type: String, required: true},
    Wards: {type: String, required: true},
    Address: {type: String, required: true},
    NumAdress: {type: String},
    Default: {type: Boolean, default: false},
    CreateAt: {type: Date, default: Date.now()},
    UpdateAt: {type: Date, default: Date.now()},
})
AddresSchema.index({'$**': 'text'});
module.exports = mongosse.model("Address",AddresSchema);