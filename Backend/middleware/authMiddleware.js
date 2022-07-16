const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {

    console.log("Protect")

    let token

    // HTTP header has an authorization object.
    // That is being checked below.
    // And we're checking for the word 'Bearer'
    // which is always followed by the token.
    // eg Bearer drgtergfge
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user using id in the token payload
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401).json({ msg:'Not authorized'});
        }
    }

    if(!token) {
        return res.status(401).json({ msg: 'Not authorized, no token'});
    }
}

const authRole = (role) => {
    return async (req, res, next) => {

        const user = await User.findById(req.user.id)

        if (user.role !== role) {
            return res.status(401).json({ msg: 'Not authorized'});
        }

        next()
    }
}


module.exports = {
    protect,
    authRole,
}