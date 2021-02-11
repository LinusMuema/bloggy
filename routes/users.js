const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const controller = require('../controllers/users.controller');

router.get('/', controller.getAllUsers)

router.get('/:id', [middleware.verifyToken, middleware.getUser], controller.getUserById);

router.put('/follow/:id', [middleware.verifyToken, middleware.getUser], controller.followUser);

router.put('/unfollow/:id', [middleware.verifyToken, middleware.getUser], controller.unfollowUser);

module.exports = router;
