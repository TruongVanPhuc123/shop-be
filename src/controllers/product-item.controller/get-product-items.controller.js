const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Product = require("../../model/Product");
const ProductItem = require("../../model/ProductItem");

const getProductItems = catchAsync(async (req, res) => {
  // Get data from request
  const { id } = req.params;

  const newId = String(id);
  const arrayId = newId.split(",");

  //business Validation
  const product = await Product.find({ id: { $in: arrayId } });
  if (!product)
    throw AppError(404, "Product not found !", "Get all product items failed");

  // Process
  const productItems = await ProductItem.find({
    productId: { $in: arrayId },
  }).populate("productId");

  // Response
  sendResponse(
    res,
    200,
    true,
    productItems,
    null,
    "Get all product items success !"
  );
});

module.exports = getProductItems;
