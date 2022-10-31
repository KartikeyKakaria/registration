const jwt = require("jsonwebtoken");
const User = require("../models/users")

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);
        const user = await User.findOne({ _id: verifyUser._id })
        console.log(user.name);
        req.token = token;
        req.user = user;

        next();
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = auth;