const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const controller = require('../controllers/blogs.controller')

router.post('/')

router.get('/')

router.get('/:id')

router.put('/:id')

router.delete('/:id')

router.put('/like/:id')

router.put('/unlike/:id')

router.put('/comment/:id')

module.exports = router;
