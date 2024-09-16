const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../model/User");

const update = catchAsync(async (req, res, next) => {
  // Get data from request
  const currentUserId = req.userId;
  const { id } = req.params;
  const { name, address, avatarUrl, phoneNumber } = req.body;

  // Business Validate
  let user = await User.findById(id);
  if (!user) throw new AppError(404, "User not found !", "Update failed !");
  if (!user._id.equals(currentUserId))
    throw new AppError(
      400,
      "Request id not equals currentUserId !",
      "Update failed"
    );

  // Process
  user = await User.findByIdAndUpdate(
    id,
    { name, address, avatarUrl, phoneNumber },
    { new: true }
  );

  // Response
  sendResponse(res, 200, true, user, null, "Update success !");
});

module.exports = update;
