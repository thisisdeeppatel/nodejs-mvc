const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [1, 2, 3],
        default: 3
    },
})

let userModel = mongoose.model("User", userSchema);

module.exports = userModel