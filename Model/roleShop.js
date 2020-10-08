const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleRoleShopsSchema = new Schema({
    Title: {type: String, required: true},
    RoleShops: [{type: Number}],
    Description: {type: String},
    CreateAt: {type: Date, default: Date.now()},
    UpdateAt: {type: Date, default: Date.now()}
})
RoleRoleShopsSchema.index({'Name': 'text', "Description":"text", "RoleShops":"text"});
const RoleShops = mongoose.model("RoleShops", RoleRoleShopsSchema)
RoleShops.createIndexes();
module.exports = RoleShops;