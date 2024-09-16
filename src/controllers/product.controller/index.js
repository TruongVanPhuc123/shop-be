const createProduct = require("./create.controller");
const deleteProduct = require("./delete.controller");
const getSingleProduct = require("./get-product.controller");
const getProducts = require("./get-products.controller");
const updateProduct = require("./update.controller");

module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}
