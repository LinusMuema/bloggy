const utils = require('../utils/utils');
const response = require('../utils/response')
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            response.forbidden(res, "a user with that email already exists");
            return;
        }

        const hash = await utils.hashPassword(req.body.password);
        const newUser = await new User({email: req.body.email, password: hash}).save();
        const token = await utils.generateAccessToken(newUser._id);
        console.log(token)
        res.status(200).json({token, newUser});

    } catch (e) { response.serverError(res, e.message) }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            response.missing(res, "no user with that email exists")
            return
        }

        const matches = await utils.verifyPassword(req.body.password, user.password)
        if (!matches){
            response.forbidden(res, "passwords do not match")
            return
        }

        const token = await utils.generateAccessToken(user._id)
        res.status(200).json({ token })

    } catch (e) { response.serverError(res, e.message) }
}
