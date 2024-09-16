const { catchAsync, sendResponse, AppError } = require("../../helpers/utils");
const OrderItem = require("../../model/OrderItem");
const User = require("../../model/User");

const getOrderItems = catchAsync(async (req, res, next) => {
  // Get data from request
  const { search, limit, page } = req.query;
  const currentUserId = req.userId;

  // Process
  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError(404, "User not found", "Get order items failed");

  const filter = [];
  if (search) {
    const value = { name: { $regex: search, $options: "i" } };
    filter.push(value);
  }
  const filterCriterial = filter.length ? { $and: filter } : {};

  const count = await OrderItem.countDocuments();
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const orderItems = await OrderItem.find(filterCriterial)
    .limit(limit)
    .skip(offset)
    .populate("productItemId");

  // Response
  sendResponse(
    res,
    200,
    true,
    { orderItems, count, totalPages },
    null,
    "Get order items success !"
  );
});

module.exports = getOrderItems;
