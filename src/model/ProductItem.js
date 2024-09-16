const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productItemSchema = Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    color: { type: String },
    size: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  { timestamps: true }
);

const ProductItem = model("ProductItem", productItemSchema);
module.exports = ProductItem;
