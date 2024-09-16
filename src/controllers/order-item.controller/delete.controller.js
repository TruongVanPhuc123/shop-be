const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const OrderItem = require("../../model/OrderItem");

const deleteOrderItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const orderItem = await OrderItem.findById(id);
  if (!orderItem)
    throw new AppError(404, "Order item not found !", "Delete failed");

  await OrderItem.deleteOne({ _id: id });

  sendResponse(res, 204, true, null, null, "Delete order item success !");
});

module.exports = deleteOrderItem;
