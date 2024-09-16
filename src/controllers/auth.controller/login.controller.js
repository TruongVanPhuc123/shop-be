const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../model/User");
const bcrypt = require("bcryptjs");

const loginWithEmail = catchAsync(async (req, res, next) => {
  // Get data from request
  const { email, password } = req.body;

  // Business Validate
  const user = await User.findOne({ email }, "+password");
  if (!user) throw new AppError(404, "User not found", "Login failed");

  // Process
  //---------- validate password bcrypt----------------
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError(400, "Wrong password", "Login failed");

  const accessToken = await user.generateToken();

  // Response
  sendResponse(res, 200, true, { user, accessToken }, null, "Login success !");
});

module.exports = loginWithEmail;
