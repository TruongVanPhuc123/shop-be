const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Product = require("../../model/Product");
const User = require("../../model/User");

const createProduct = catchAsync(async (req, res) => {
  const data = req.body;
  const currentUserId = req.userId;

  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(404, "User not found !", "Create product failed");
  if (user.roles !== "admin")
    throw new AppError(
      403,
      "You not allowed to access !",
      "Create product failed"
    );

  const product = await Product.find({ name: data.name });
  if (product.length)
    throw new AppError(
      409,
      "Product already exists !",
      "Create product failed"
    );

  const createdProduct = await Product.create(data);

  sendResponse(
    res,
    201,
    true,
    createdProduct,
    null,
    "Create product success !"
  );
});

module.exports = createProduct;
