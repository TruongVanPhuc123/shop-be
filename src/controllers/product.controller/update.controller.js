const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Product = require("../../model/Product");
const User = require("../../model/User");

const updateProduct = catchAsync(async (req, res, next) => {
  const data = req.body;
  const currentUserId = req.userId;
  const { id } = req.params;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(404, "User not found !", "Update product failed");
  if (user.roles !== "admin")
    throw new AppError(
      403,
      "You not allowed to access !",
      "Update product failed"
    );

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!product)
    throw new AppError(500, "Server error !", "Update product failed");

  sendResponse(res, 200, true, product, null, "Update product success !");
});

module.exports = updateProduct;
