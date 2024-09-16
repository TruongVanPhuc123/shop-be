const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const CartItem = require("../../model/CartItem");
const ProductItem = require("../../model/ProductItem");

const createCartItem = catchAsync(async (req, res, next) => {
  // Get data from request
  const { productItemId, quantity } = req.body;
  const currentUserId = req.userId;

  //Business validation
  let productItem = await ProductItem.findById(productItemId);
  let cartItem = await CartItem.findOne({
    userId: currentUserId,
    productItemId,
  });

  if (!productItem)
    throw new AppError(
      404,
      "Product variant not found !",
      "Create cartItem failed"
    );
  let productQuantity = productItem.quantity;

  if (quantity > productQuantity)
    throw new AppError(
      400,
      "Product quantity is not enough !",
      "Create cartItem failed"
    );

  //Process
  if (cartItem) {
    if (quantity <= productQuantity) {
      cartItem.quantity += quantity;
      productQuantity -= quantity;
      cartItem.save();
      await ProductItem.findByIdAndUpdate(
        productItemId,
        { quantity: productQuantity },
        { new: true }
      );
    } else {
      throw new AppError(
        400,
        "Product quantity exceeds limit !",
        "createCartItem failed"
      );
    }
  } else {
    cartItem = await CartItem.create({
      productItemId,
      userId: currentUserId,
      quantity,
    });
    productQuantity -= quantity;
    await ProductItem.findByIdAndUpdate(
      productItemId,
      { quantity: productQuantity },
      { new: true }
    );
  }

  //Response
  sendResponse(res, 201, true, cartItem, null, "Add to cart success !");
});

module.exports = createCartItem;
