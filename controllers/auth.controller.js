const utils = require('../utils/utils');
const response = require('../utils/response')
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const users = await User.find({email: req.body.email})
        if (users.length !== 0) {
            response.forbidden(res, "a user with that email already exists")
            return
        }

        const hash = await utils.hashPassword(req.body.password)
        const user = await new User({email: req.body.email, password: hash}).save()
        res.status(200).json(user)

    } catch (e) {
        response.serverError(res, e.message)
    }
}

exports.login = async (req, res) => {
    try {
        const users = await User.find({email: req.body.email})
        if (users.length === 0) {
            response.forbidden(res, "no user with that email exists")
            return
        }

        const user = users[0]
        const matches = await utils.verifyPassword(req.body.password, user.password)
        if (!matches){
            response.forbidden(res, "passwords do not match")
            return
        }

        const token = await utils.generateAccessToken(user._id)
        res.status(200).json({ token })

    } catch (e) {
        response.serverError(res, e.message)
    }
}
