const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const jwt = require('jsonwebtoken');

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: String, enum: ["admin", "user"], default: "user" },
    address: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    phoneNumber: { type: String, default: "", maxlength: 12 },

    isDeleted: { type: Boolean, default: false, select: false },
}, { timestamps: true })

userSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.password;
    delete user.isDeleted;
    return user;
}

userSchema.methods.generateToken = async function () {
    const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: "1d" })
    return accessToken;
}

const User = model("User", userSchema)
module.exports = User;