const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const { inputRules } = require('../middleware/validator')

/* get data */
router.get('/getKeyword', inputRules, restaurantController.getKeyword)



/* fetch data */
// 餐廳關鍵字
router.get('/fetchKeyword', inputRules, restaurantController.fetchKeyword)
// 用餐目的
router.get('/purpose', inputRules, restaurantController.fetchPurpose)
// 菜餚類別
router.get('/type', inputRules, restaurantController.fetchType)
// 地區美食
router.get('/dish', inputRules, restaurantController.fetchDish)
// basic
router.get('/basic', inputRules, restaurantController.fetchBasic)

module.exports = router
