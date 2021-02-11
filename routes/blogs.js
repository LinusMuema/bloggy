const express = require('express')
const router = express.Router()
const middleware = require('../utils/middleware')
const controller = require('../controllers/blogs.controller')

router.post('/', middleware.verifyToken, controller.addBlog);

router.get('/', controller.getAllBlogs);

router.get('/:id', [middleware.verifyToken, middleware.getBlog], controller.getBlogById);

router.put('/:id', [middleware.verifyToken, middleware.getBlog], controller.updateBlog);

router.delete('/:id', [middleware.verifyToken, middleware.getBlog], controller.deleteBlog);

router.put('/like/:id', [middleware.verifyToken, middleware.getBlog], controller.likeBlog);

router.put('/unlike/:id', [middleware.verifyToken, middleware.getBlog], controller.unlikeBlog);

router.put('/comment/:id', [middleware.verifyToken, middleware.getBlog], controller.commentOnBlog);

module.exports = router;
