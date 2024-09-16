const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../model/User");

const getUsers = catchAsync(async (req, res, next) => {
  // Get data from request
  const currentUserId = req.userId;
  const { page, limit } = req.query;

  // Business Validate
  const admin = await User.findById(currentUserId);
  if (!admin) throw new AppError(404, "User not found !", "Get users failed");
  if (admin.roles !== "admin")
    throw new AppError(403, "You not allowed to access !", "Get users failed");

  // Process
  const filterConditions = [{ isDeleted: false }, { roles: "user" }];
  const filterCriterial = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const countUser = await User.countDocuments(filterCriterial);
  const totalPages = Math.ceil(countUser / limit);
  const offset = limit * (page - 1);

  const users = await User.find(filterCriterial)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  // Response
  sendResponse(
    res,
    200,
    true,
    users,
    totalPages,
    countUser,
    null,
    "Get users Success !"
  );
});

module.exports = getUsers;
