const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/api/restaurantController')
const { inputRules } = require('../middleware/validator')

// 餐廳關鍵字
router.get('/restaurants/keyword', inputRules, restaurantController.getKeyword)
// 用餐目的
router.get('/restaurants/purpose', inputRules, restaurantController.getPurpose)
// 菜餚類別
router.get('/restaurants/type', inputRules, restaurantController.getType)
// 地區美食
router.get('/restaurants/dish', inputRules, restaurantController.getDish)

module.exports = router
