const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validation } = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');
const cartItemController = require('../controllers/cart-item.controller');
Joi.objectId = require("joi-objectid")(Joi);

/** 
 * @route GET /cartItems:/:id
 * @description Get single cartItem
 * @access Login Required 
*/

const checkIdGetSingleCartItemsSchema = Joi.object({
    id: Joi.objectId()
})

router.get("/:id", validation(checkIdGetSingleCartItemsSchema, "params"),
    authentication.loginRequired, cartItemController.getSingleCartItem)

/** 
 * @route GET /cartItems?page=1&limit=10
 * @description Get list cartItems by currentUserId
 * @access Login Required 
*/
const checkGetListCartItemsSchema = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10)
})

router.get("/", validation(checkGetListCartItemsSchema, "query"),
    authentication.loginRequired, cartItemController.getCartItems)

/** 
 * @route POST /cartItems
 * @description create a new cartItem 
 * @body { productId, quantity }
 * @authentication header currentUserID
 * @access Login Required 
*/
const checkCreateCarItemSchema = Joi.object({
    productItemId: Joi.objectId(),
    quantity: Joi.number().default(1)
})

router.post("/", validation(checkCreateCarItemSchema, "body"),
    authentication.loginRequired, cartItemController.createCartItem)

/** 
 * @route PUT /cartItems/:id
 * @description Update quantity of cartItem
 * @body { quantity }
 * @access Login Required 
*/
const checkIdUpdateCarItemSchema = Joi.object({
    id: Joi.objectId(),
})
const updateCarItemSchema = Joi.object({
    quantity: Joi.number()
})

router.put("/:id",
    validation(checkIdUpdateCarItemSchema, "params"),
    validation(updateCarItemSchema, "body"),
    authentication.loginRequired, cartItemController.updateCartItem)
/** 
 * @route DELETE /cartItems/:id
 * @description Delete cartItem
 * @access Login Required 
*/

const checkIdDeleteCarItemSchema = Joi.object({
    id: Joi.objectId(),
})

router.delete("/:id",
    validation(checkIdDeleteCarItemSchema, "params"),
    authentication.loginRequired, cartItemController.deleteCartItem)

module.exports = router;    