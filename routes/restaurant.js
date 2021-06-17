const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const { inputRules } = require('../middleware/validator')

// 餐廳關鍵字
router.get('/keyword', inputRules, restaurantController.getKeyword)
// 用餐目的
router.get('/purpose', inputRules, restaurantController.getPurpose)
// 菜餚類別
router.get('/type', inputRules, restaurantController.getType)
// 地區美食
router.get('/dish', inputRules, restaurantController.getDish)
// basic
router.get('/basic', inputRules, restaurantController.getBasic)

module.exports = router
