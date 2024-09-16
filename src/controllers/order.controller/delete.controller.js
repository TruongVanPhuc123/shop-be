const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const Order = require("../../model/Order");
const OrderItem = require("../../model/OrderItem");

const deleteOrder = catchAsync(async (req, res) => {
  // Get data from request
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  if (!order)
    throw new AppError(404, "Order not found !", "Delete order failed");

  // Process
  await Order.deleteOne({ _id: orderId });
  await OrderItem.deleteMany({ orderId });

  // Response
  sendResponse(res, 204, true, null, null, "Delete order success !");
});

module.exports = deleteOrder;
