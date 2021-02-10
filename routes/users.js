const express = require('express');
const router = express.Router();
const middleware = require('../utils/middleware');
const controller = require('../controllers/users.controller');

router.get('/:id');

router.put('/follow/:id');

router.put('/unfollow/:id');

module.exports = router;
