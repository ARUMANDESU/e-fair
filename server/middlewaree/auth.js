const jwt = require('jsonwebtoken')
const User = require("../modules/User")
const Role = require("../modules/Role")

module.exports = function () {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
            try {
                const token=req.headers.authorization.split(' ')[1]
                if (!token) {
                    return res.status(403).json({message: "User not authorized"})
                }

                const user = jwt.decode(token, process.env.secret)
                res.user= user


                next();
            } catch (e) {
                console.log(e)
                return res.status(403).json({message: "User not authorized"})
            }

    }
};