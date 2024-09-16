const createOrder = require("./create.controller");
const deleteOrder = require("./delete.controller");
const getOrdersByCurrentUserId = require("./get.orders.by.user.id.controller");
const getOrders = require("./get.orders.controller");
const updateOrder = require("./update.controller");

module.exports = {
    createOrder,
    getOrders,
    getOrdersByCurrentUserId,
    updateOrder,
    deleteOrder
};