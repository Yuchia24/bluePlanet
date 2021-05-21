const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/api/restaurantController')

router.get('/restaurants/keywords', restaurantController.getKeywords)

module.exports = router
