const Blog = require('../models/blog');
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
        req._id = payload.id
        next()
    } catch (e) {
        response.serverError(res, e.message)
    }
}

exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog){
            response.missing(res, "no blog with that id exists")
            return
        }
        req.blog = blog
        next()
    } catch (e) {
        response.serverError(res, e.message)
    }
}
