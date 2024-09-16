const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const CartItem = require("../../model/CartItem");
const ProductItem = require("../../model/ProductItem");

const deleteCartItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cartItem = await CartItem.findByIdAndDelete(id);

  const productItemId = cartItem.productItemId;
  const productItem = await ProductItem.findById(productItemId);
  const cartItemQuantity = cartItem.quantity;
  const newQuantity = productItem.quantity + cartItemQuantity;

  await ProductItem.findOneAndUpdate(
    { _id: productItemId },
    { quantity: newQuantity }
  );

  if (!cartItem)
    throw new AppError(500, "Server error !", "Delete cart item failed");

  sendResponse(res, 204, true, null, null, "Delete cart item success !");
});

module.exports = deleteCartItem;
