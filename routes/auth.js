const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const controller = require('../controllers/auth.controller')

router.post('/register');

router.post('/login');

module.exports = router;
