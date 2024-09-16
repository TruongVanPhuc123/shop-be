const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartItemSchema = Schema({
    productItemId: { type: mongoose.Types.ObjectId, required: true, ref: "ProductItem" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    quantity: { type: Number, default: 1, required: true }
}, { timestamps: true })

const CartItem = model("CartItem", cartItemSchema)
module.exports = CartItem;