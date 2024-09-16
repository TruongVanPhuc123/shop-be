const { catchAsync, AppError, sendResponse } = require("../../helpers/utils");
const User = require("../../model/User");
const bcrypt = require("bcryptjs");

const register = catchAsync(async (req, res, next) => {
  // Get data from request
  let { name, email, password, comfirmPassword, roles } = req.body;

  // Business Validate
  let user = await User.findOne({ email });

  if (user)
    throw new AppError(409, "Email have in database !", "Register failed");
  if (comfirmPassword !== password) {
    throw new AppError(
      400,
      "Comfirm password not equals password !",
      "Register failed"
    );
  }

  // Process
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({ name, email, password, roles });
  if (!user)
    throw new AppError(500, "Sever nothing to register", "Register failed");
  const accessToken = await user.generateToken();

  // Response
  sendResponse(
    res,
    201,
    true,
    { user, accessToken },
    null,
    "Register success !"
  );
});

module.exports = register;
