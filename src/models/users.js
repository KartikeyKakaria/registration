const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})

User.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 4)
    }
    next()
})

//collection
const Register = new mongoose.model("User", User)

module.exports = Register;