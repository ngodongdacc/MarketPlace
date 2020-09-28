const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
    Title: {type: String, required: true},
    Roles: [{type: Number}],
    Description: {type: String},
    CreateAt: {type: Date, default: Date.now()},
    UpdateAt: {type: Date, default: Date.now()}
})
RolesSchema.index({'Name': 'text', "Description":"text", "Roles":"text"});
const Roles = mongoose.model("Roles", RolesSchema)
Roles.createIndexes();
module.exports = Roles;