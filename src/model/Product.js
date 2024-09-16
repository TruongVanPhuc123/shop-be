const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = Schema({
    name: { type: String },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
}, { timestamps: true });

productSchema.virtual('productItems', {
    ref: 'ProductItem',
    localField: '_id',
    foreignField: 'productId',
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = model("Product", productSchema);
module.exports = Product;