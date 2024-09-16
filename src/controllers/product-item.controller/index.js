const createProductItem = require("./create.controller");
const updateProductItem = require("./update.controller");
const deleteProductItem = require("./delete.controller");
const getProductItems = require("./get-product-items.controller");

module.exports = {
    createProductItem,
    getProductItems,
    updateProductItem,
    deleteProductItem
}