const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../model/User");

const getCurrentUser = catchAsync(async (req, res, next) => {
  // Get data from request
  const currentUserId = req.userId;

  // Business Validate
  const user = await User.findById(currentUserId);

  if (!user)
    throw new AppError(404, "User not found !", "Get current user failed");

  // Response
  sendResponse(res, 200, true, user, null, "Get current user success !");
});

module.exports = getCurrentUser;
