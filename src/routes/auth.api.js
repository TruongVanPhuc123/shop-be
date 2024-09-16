const express = require("express");
const router = express.Router();
const Joi = require("joi");
require("dotenv").config();
const authController = require("../controllers/auth.controller/");
const { validation } = require("../middlewares/validation");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * @route POST /auth/login
 * @description Login with email and password
 * @body { email, password }
 * @access Public
 */
const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

router.post(
  "/login",
  validation(loginSchema, "body"),
  authController.loginWithEmail
);

/**
 * @route POST /auth/register
 * @description Register new user
 * @body { name, email, password, comfirmPassword }
 * @access Public
 */
const registerSchema = Joi.object({
  name: Joi.string().required().max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  comfirmPassword: Joi.string().required(),
  roles: Joi.string().valid("admin", "user").default("user"),
});
router.post(
  "/register",
  validation(registerSchema, "body"),
  authController.register
);

module.exports = router;
