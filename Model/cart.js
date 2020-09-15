const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    listProduct:
        [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                },
                quantity: { type: Number, default: 1 },
                price: {
                    type: Number,
                    required: true
                },
                total: {
                    type: Number,
                    required: true,
                }

            }
        ],
    subTotal: {
        default: 0,
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    // cookieId: { type: String, default:"" },
    status: { type: Boolean, default: true },
    des: { type: String, default: "" },
    title: { type: String },
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