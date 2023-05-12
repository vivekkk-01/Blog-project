const jwt = require("jsonwebtoken")
const User = require("../../models/User")

const verifyToken = async (req, res, next) => {
    let token
    if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, async (error, decode) => {
            if (error) {
                return res.status(403).json("You are not authorized")
            }
            const user = await User.findById(decode.id)
            req.user = user;
            next()
        })

    } else {
        return res.status(403).json("You are not authorized")
    }
}

module.exports = verifyToken;