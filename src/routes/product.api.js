const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validation } = require('../middlewares/validation');
const authentication = require('../middlewares/authentication');
const productController = require('../controllers/product.controller');
Joi.objectId = require("joi-objectid")(Joi);

/** 
 * @route GET /products?page=1&limit=10 
 * @description Get products with pagination
 * @access Public
*/
const getProductsSchema = Joi.object({
    search: Joi.string(),
    page: Joi.number().default(1),
    limit: Joi.number().default(50),
})

router.get("/",
    validation(getProductsSchema, "query"),
    productController.getProducts)

/** 
 * @route GET /products/:id/
 * @description Get detail product
 * @access Public
*/
const productParamsSchema = Joi.object({
    id: Joi.objectId()
})

router.get("/:id",
    validation(productParamsSchema, "params"),
    productController.getSingleProduct)

/** 
* @route GET /products/:id/productItems
* @description Get all productItems shop of product with Id
* @access Public
*/

const getAllProductItemsSchema = Joi.object({
    id: Joi.objectId()
})

router.get("/:id/productItems",
    validation(getAllProductItemsSchema, "params"),
    productController.getAllProductItems)

/** 
 * @route POST /products (admin only)
 * @description Create a new product with admin 
 * @body { name, barnd, category, description, price }
 * @access Login required
*/

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
})

router.post("/", validation(createProductSchema, "body"),
    authentication.loginRequired,
    productController.createProduct)

/** 
 * @route PUT /products/:id (admin only)
 * @description update product with admin
 * @body { name, barnd, category, description }
 * @access Login required
*/

const updateProductSchema = Joi.object({
    name: Joi.string(),
    brand: Joi.string(),
    category: Joi.string(),
    description: Joi.string(),
})

const updateProductIdSchema = Joi.object({
    id: Joi.objectId()
})

router.put("/:id",
    validation(updateProductSchema, "body"),
    validation(updateProductIdSchema, "params"),
    authentication.loginRequired,
    productController.updateProduct)

/** 
 * @route DELETE /products/:id (admin only)
 * @description delete product with admin
 * @access Login required
 * 
*/

const deleteProductIdSchema = Joi.object({
    id: Joi.objectId()
})

router.delete("/:id",
    validation(deleteProductIdSchema, "params"),
    authentication.loginRequired,
    productController.deleteProduct)

module.exports = router;    