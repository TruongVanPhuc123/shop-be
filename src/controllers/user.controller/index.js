const getCurrentUser = require("./get-user.controller");
const getUsers = require("./get-users.controller");
const update = require("./update.controller");

module.exports = {
    getUsers,
    getCurrentUser,
    update
}