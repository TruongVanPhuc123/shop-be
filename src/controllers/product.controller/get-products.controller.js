const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Product = require("../../model/Product");
const ProductItem = require("../../model/ProductItem");

const getProducts = catchAsync(async (req, res) => {
  // Get data from request
  const { page, limit, search, sort } = req.query;

  // Process
  let filterConditions = [];

  if (search && search !== "All") {
    const value = { name: { $regex: search, $options: "i" } };
    filterConditions.push(value);
  }

  if (sort && sort === "increase") {
    const productItems = await ProductItem.find({ price: { $gte: 200 } });
    const productId = productItems.map((e) => e.productId);
    const value = { _id: { $in: productId } };
    filterConditions.push(value);
  } else if (sort && sort === "decrease") {
    const productItems = await ProductItem.find({ price: { $lte: 200 } });
    const productId = productItems.map((e) => e.productId);
    const value = { _id: { $in: productId } };
    filterConditions.push(value);
  } else {
    const value = {};
    filterConditions.push(value);
  }

  const filterCriterial = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Product.countDocuments();
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const products = await Product.find(filterCriterial)
    .limit(limit)
    .skip(offset)
    .populate("productItems")
    .exec();

  sendResponse(
    res,
    200,
    true,
    { products, totalPages, count },
    null,
    "Get products success !"
  );
});

module.exports = getProducts;
