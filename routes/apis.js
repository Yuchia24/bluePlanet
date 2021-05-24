const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/api/restaurantController')

// 餐廳關鍵字
router.post('/restaurants/keywords', restaurantController.getVenderKeyword)
router.get('/restaurants/keywords/:kw', restaurantController.getKeyword)
// 用餐目的
router.post('/restaurants/purpose', restaurantController.getVenderPurpose)
router.get('/restaurants/purpose', restaurantController.getPurpose)
// 菜餚類別
router.post('/restaurants/type', restaurantController.getVenderType)
router.get('/restaurant/type/:restaurant_id', restaurantController.getType)
// 地區美食
router.post('/restaurants/dish', restaurantController.getVenderDish)
router.get('/restaurant/dish/:restaurant_id', restaurantController.getDish)

module.exports = router
