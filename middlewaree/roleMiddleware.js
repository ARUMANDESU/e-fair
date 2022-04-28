const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token=req.cookies.auth.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User not authorized"})
            }
            const user = jwt.verify(token, secret)
            let hasRole = false
            user.role.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "You don't have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User not authorized"})
        }
    }
};