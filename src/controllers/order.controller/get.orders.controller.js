const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Order = require("../../model/Order");
const User = require("../../model/User");

const getOrders = catchAsync(async (req, res) => {
  // Get data from request
  const { page, limit, status } = req.query;
  const currentUserId = req.userId;

  let filterConditions = [];

  //Bussines Validation
  const user = await User.findById(currentUserId);
  if (!user) throw new AppError(404, "User not found !", "Get orders failed");

  if (user.roles !== "admin")
    throw new AppError(
      403,
      "You not allowed to access !",
      "Get order items failed"
    );

  if (status && !status === "All") {
    // Process
    const value = { status: { $regex: status, $options: "i" } };
    filterConditions.push(value);
  }
  const filterCriterial = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Order.countDocuments();
  const totalPages = Math.ceil(count / limit);
  const offset = limit * (page - 1);

  const orders = await Order.find(filterCriterial)
    .limit(limit)
    .skip(offset)
    .populate("userId");

  // Response
  sendResponse(
    res,
    200,
    true,
    { orders, count, totalPages },
    null,
    "Get orders success !"
  );
});

module.exports = getOrders;
