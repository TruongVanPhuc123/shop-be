const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Product = require("../../model/Product");

const getSingleProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId).populate("productItems");
  if (!product)
    throw new AppError(404, "Product not found !", "Get single product failed");

  sendResponse(res, 200, true, product, null, "Get single product success !");
});

module.exports = getSingleProduct;
