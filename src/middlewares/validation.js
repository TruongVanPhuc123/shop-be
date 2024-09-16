const { AppError } = require("../helpers/utils")

const validation = (schema, key) => (req, res, next) => {
    const data = req[key]

    const { error, value } = schema.validate(data, { abortEarly: false })

    if (error) {
        throw next(new AppError(400, error.message, "Client error"))
    }

    req[key] = value
    next()
}

module.exports = { validation }