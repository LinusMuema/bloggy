const response = require('../utils/response');
const Blog = require('../models/blog');

exports.addBlog = async (req, res) => {
    try {
        const blog = new Blog(req.body)
        blog.author = req._id
        const result = await blog.save()
        res.status(200).json({blog: result})
    } catch (e) { response.serverError(res, e.message) }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (e){ response.serverError(res, e.message) }
}

exports.getBlogById = async (req, res) => {
    try { res.status(200).json(req.blog) }
    catch (e){ response.serverError(res, e.message) }
}

exports.updateBlog = async (req, res) => {
    try {
        const blog = req.blog
        /**
         * Checks if the fields in the body are not undefined
         * If the fields exist, update the document, otherwise, keep the existing record
         * */
        const titleUpdate = req.body.title
        blog.title = titleUpdate ? titleUpdate : blog.title

        const contentUpdate = req.body.content
        blog.content = contentUpdate ? contentUpdate : blog.content

        const update = await blog.save()
        res.status(200).json(update)
    } catch (e){ response.serverError(res, e.message) }
}

exports.deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted)
    } catch (e) { response.serverError(res, e.message) }
}

exports.likeBlog = async (req, res) => {
    try {
        const blog = req.blog

        // convert the likes array to set to prevent duplication of records
        const set = new Set(blog.likes)
        set.add(req._id)

        // convert the set back to an array
        blog.likes = [...set]

        const update = await blog.save()
        res.status(200).json(update)
    } catch (e) { response.serverError(res, e.message) }
}

exports.unlikeBlog = async (req, res) => {
    try {
        const blog = req.blog

        // remove the user id from the likes array
        blog.likes = blog.likes.filter(id => id !== req._id)

        const update = await blog.save()
        res.status(200).json(update)
    } catch (e) { response.serverError(res, e.message) }
}

exports.commentOnBlog = async (req, res) => {
    try {
        const blog = req.blog
        blog.comments.unshift({user: req._id, comment: req.body.comment})
        const update = await blog.save()
        res.status(200).json(update)
    } catch (e) { response.serverError(res, e.message) }
}
