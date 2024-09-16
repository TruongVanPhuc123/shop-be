const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const CartItem = require("../../model/CartItem");
const ProductItem = require("../../model/ProductItem");

const updateCartItem = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { id } = req.params;
  const { quantity } = req.body;

  let cartItem = await CartItem.find({ _id: id, userId: currentUserId });
  if (!cartItem.length)
    throw new AppError(404, "cart item not found !", "Update cart item failed");

  const currentQuantity = cartItem[0].quantity;

  cartItem[0].quantity = quantity;
  cartItem[0].save();

  const productItemId = cartItem[0].productItemId;
  const productItem = await ProductItem.findById(productItemId);
  let newQuantity = 0;

  if (quantity > currentQuantity) {
    const calculatedQuantity = quantity - currentQuantity;
    newQuantity = productItem.quantity - calculatedQuantity;
  } else if (quantity === currentQuantity) {
    newQuantity = productItem.quantity;
  } else {
    const calculatedQuantity = currentQuantity - quantity;
    newQuantity = productItem.quantity + calculatedQuantity;
  }

  await ProductItem.findOneAndUpdate(
    { _id: productItemId },
    { quantity: newQuantity },
    { new: true }
  );

  sendResponse(res, 200, true, cartItem, null, "Update cart item success !");
});

module.exports = updateCartItem;
