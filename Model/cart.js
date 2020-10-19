const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    ListProduct: {type:Array,default:[]},
    SubTotal: {
        default: 0,
        type: Number
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        required:true
    },
    // cookieId: { type: String, default:"" },
    SubPrice:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Carts", CartSchema)
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let ItemSchema = new Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Products",
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: [1, 'Quantity can not be less then 1.']
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     total: {
//         type: Number,
//         required: true,
//     }
// }, {
//     timestamps: true
// })
// module.exports = mongoose.model('Items', ItemSchema);

// const CartSchema = new Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Users",
//     },

//     items: [ItemSchema],

//     subTotal: {
//         default: 0,
//         type: Number
//     }
// }, {
//     timestamps: true
// })
// module.exports = mongoose.model('Carts', CartSchema);