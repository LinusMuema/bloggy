const response = require('../utils/response');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) { response.serverError(res, e.message) }
}

exports.getUserById = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (e) { response.serverError(res, e.message) }
}

exports.followUser = async (req, res) => {
    try {
        const user = req.user

        // convert the list to set to prevent duplication
        const set = new Set(user.followers)
        set.add(req._id)

        // convert the set back to array
        user.followers = [...set]

        const update = await user.save()
        res.status(200).json(update)
    } catch (e) { response.serverError(res, e.message) }
}

exports.unfollowUser = async (req, res) => {
    try {
        const user = req.user

        // remove user id from the followers array
        user.followers = user.followers.filter(id => id !== req._id)

        const update = await user.save()
        res.status(200).json(update)
    } catch (e) { response.serverError(res, e.message) }
}
