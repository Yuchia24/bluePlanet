const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/api/restaurantController')

// 餐廳關鍵字
router.post('/restaurants/keywords', restaurantController.getVenderKeyword)
router.get('/restaurants/keywords', restaurantController.getKeyword)
// 用餐目的
router.post('/restaurants/purpose', restaurantController.getVenderPurpose)
router.get('/restaurants/purpose', restaurantController.getPurpose)
// 菜餚類別
router.post('/restaurant/type', restaurantController.getVenderType)
router.get('/restaurant/type', restaurantController.getType)
// 地區美食
router.post('/restaurant/dish', restaurantController.getVenderDish)
router.get('/restaurant/dish', restaurantController.getDish)

module.exports = router
