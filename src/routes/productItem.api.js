const express = require('express');
const router = express.Router();
const Joi = require('joi');
Joi.objectId = require("joi-objectid")(Joi);
const { validation } = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');
const productItemsController = require('../controllers/product-item.controller');

/** 
 * @route POST /productItems (admin only)
 * @description Create productItems 
 * @body { productId, price, color, size, quantity }
 * @access Login required
*/
const createProductItemsSchema = Joi.object({
    productId: Joi.objectId().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().required(),
})

router.post("/",
    validation(createProductItemsSchema, "body"),
    authentication.loginRequired, productItemsController.createProductItem)

/** 
* @route GET /productItems/:id
* @description Get all productItems wit productId 
* @params { id } 
* @access Login required
*/

const getProductItemsWithIdSchema = Joi.object({
    id: Joi.string().required(),
})

router.get("/:id",
    validation(getProductItemsWithIdSchema, "params"),
    authentication.loginRequired, productItemsController.getProductItems)

/** 
 * @route PUT /productItems/:id (admin only)
 * @description Update productItems 
 * @body { price, color, size, quantity }
 * @access Login required
*/

const updateProductItemsIdSchema = Joi.object({
    id: Joi.objectId()
})

const updateProductItemsSchema = Joi.object({
    price: Joi.number(),
    color: Joi.string(),
    size: Joi.string(),
    quantity: Joi.number(),
})

router.put("/:id",
    validation(updateProductItemsSchema, "body"),
    validation(updateProductItemsIdSchema, "params"),
    authentication.loginRequired, productItemsController.updateProductItem)

/** 
 * @route DELETE /productItems/:id (admin only)
 * @description Delete productItems 
 * @access Login required
*/

const deleteProductItemsIdSchema = Joi.object({
    id: Joi.objectId()
})

router.delete("/:id",
    validation(deleteProductItemsIdSchema, "params"),
    authentication.loginRequired, productItemsController.deleteProductItem)

module.exports = router;   