const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/api/restaurantController')

// 餐廳關鍵字
router.get('/restaurants/keywords', restaurantController.getKeyword)
// 用餐目的
router.get('/restaurants/purpose', restaurantController.getPurpose)
// 菜餚類別
router.get('/restaurants/type', restaurantController.getType)
// 地區美食
router.get('/restaurants/dish', restaurantController.getDish)

module.exports = router
