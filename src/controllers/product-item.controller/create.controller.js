const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const ProductItem = require("../../model/ProductItem");
const Product = require("../../model/Product");
const User = require("../../model/User");

const createProductItem = catchAsync(async (req, res, next) => {
  const data = req.body;
  const { productId } = data;
  const currentUserId = req.userId;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(404, "User not found !", "Create product item failed");
  if (user.roles !== "admin")
    throw new AppError(
      403,
      "You not allowed to access !",
      "Create product item failed"
    );

  const product = await Product.findById(productId);
  if (!product)
    throw new AppError(
      404,
      "Product not found !",
      "Create product item failed"
    );

  const productItem = await ProductItem.create(data);

  sendResponse(
    res,
    201,
    true,
    productItem,
    null,
    "Create product item success !"
  );
});

module.exports = createProductItem;
