const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Product = require("../../model/Product");
const ProductItem = require("../../model/ProductItem");
const User = require("../../model/User");

const deleteProduct = catchAsync(async (req, res, next) => {
  const currentUserId = req.userId;
  const { id } = req.params;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(404, "User not found !", "Delete product failed");
  if (user.roles !== "admin")
    throw new AppError(
      403,
      "You not allowed to access !",
      "Delete product failed"
    );

  await Product.deleteOne({ _id: id });
  await ProductItem.deleteMany({ productId: id });

  sendResponse(res, 200, true, null, null, "Delete product success !");
});

module.exports = deleteProduct;
