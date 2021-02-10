const User = require('../models/user');
const response = require('./response');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization
        if (!bearer) {
            response.forbidden(res, 'please provide an bearer token')
            return
        }

        const token = bearer.split(" ")[1]
        const payload = await jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = await User.findById(payload.id)

    } catch (e) {
        response.serverError(res, e.message)
    }
}
