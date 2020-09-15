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
                IdShop: {type: mongoose.Types.ObjectId, required: true},
                IdCategory: { type: mongoose.Types.ObjectId, required: true },
                IdCategorySub: { type: mongoose.Types.ObjectId, required: true },
                Name: { type: String, required: true },
                Sale: { type: Number, default: 0, max: 100, min: 0 },
                Image: { type: String },
                Color: { type: String }, // Màu họa tiết,
                NumberSell: {type: Number}, // số lượng bán được,
                quantity: { type: Number, default: 1 },
                ListedPrice: { type: Number}, // Giá niêm yết
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