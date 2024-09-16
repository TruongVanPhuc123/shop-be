const express = require("express");
const router = express.Router();
const Joi = require("joi");
const userController = require("../controllers/user.controller");
const { validation } = require("../middlewares/validation");
const authentication = require("../middlewares/authentication");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me", authentication.loginRequired, userController.getCurrentUser);

/**
 * @route GET /users?page=1&limit=10 (admin only)
 * @description Get users with pagination
 * @access Login required
 */

const getUsersSchema = Joi.object({
  limit: Joi.number().default(5),
  page: Joi.number().default(1),
});

router.get(
  "/",
  validation(getUsersSchema, "query"),
  authentication.loginRequired,
  userController.getUsers
);

/**
 * @route PUT /users/:id
 * @description Update user profile
 * @params { id }
 * @body { name, address, avatarUrl, phoneNumber }
 * @access Login required
 */

const checkIdSchema = Joi.object({
  id: Joi.objectId(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().allow("").max(30),
  address: Joi.string().allow(""),
  avatarUrl: Joi.string().allow(""),
  phoneNumber: Joi.number().allow(""),
});

router.put(
  "/:id",
  validation(updateUserSchema, "body"),
  validation(checkIdSchema, "params"),
  authentication.loginRequired,
  userController.update
);

module.exports = router;
