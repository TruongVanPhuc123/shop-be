const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = Schema({
    productItemId: { type: mongoose.Types.ObjectId, required: true, ref: "ProductItem" },
    orderId: { type: mongoose.Types.ObjectId, required: true, ref: "Order" },
    quantity: { type: Number, required: true }
}, { timestamps: true })

const OrderItem = model("OrderItem", orderItemSchema)
module.exports = OrderItem;