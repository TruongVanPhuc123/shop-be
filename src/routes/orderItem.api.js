const orderItemController = require("../controllers/order-item.controller");
const authentication = require("../middlewares/authentication");
const { validation } = require("../middlewares/validation");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * @route GET /orderItems?page=1&limit=10 (admin only)
 * @description Get all order items
 * @query { search, limit, page }
 * @access Login required
 */

const getOrderItemsSchema = Joi.object({
  search: Joi.string(),
  limit: Joi.number().default(10),
  page: Joi.number().default(1),
});

router.get(
  "/",
  validation(getOrderItemsSchema, "query"),
  authentication.loginRequired,
  orderItemController.getOrderItems
);

/**
 * @route DELETE /orderItems/:id
 * @description Get all order items
 * @params { id }
 * @access Login required
 */

const deleteOrderItemsSchema = Joi.object({
  id: Joi.objectId(),
});

router.delete(
  "/:id",
  validation(deleteOrderItemsSchema, "params"),
  authentication.loginRequired,
  orderItemController.deleteOrderItem
);

module.exports = router;
