const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Order = require("../../model/Order");
const User = require("../../model/User");

const getOrdersByCurrentUserId = catchAsync(async (req, res) => {
  // Get data from request
  const { page, limit, status } = req.query;
  const currentUserId = req.userId;

  // Process
  let filterConditions = [];

  if (status !== "All") {
    const value = {
      status: { $regex: status, $options: "i" },
      userId: currentUserId,
    };
    filterConditions.push(value);
  }

  const filterCriterial = filterConditions.length
    ? { $and: filterConditions }
    : { userId: currentUserId };

  const count = await Order.countDocuments({ userId: currentUserId });
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const orders = await Order.find(filterCriterial)
    .limit(limit)
    .skip(offset)
    .populate({
      path: "orderItems",
      populate: {
        path: "productItemId",
        populate: {
          path: "productId",
        },
      },
    });

  // Response
  sendResponse(
    res,
    200,
    true,
    { orders, count, totalPages },
    null,
    "Get current orders success !"
  );
});

module.exports = getOrdersByCurrentUserId;
