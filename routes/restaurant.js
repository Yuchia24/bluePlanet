const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const { inputRules } = require('../middleware/validator')

/* get data */
router.get('/getKeyword', inputRules, restaurantController.getKeyword)
router.get('/getPurpose', inputRules, restaurantController.getPurpose)
router.get('/getType', inputRules, restaurantController.getType)
router.get('/getDish', inputRules, restaurantController.getDish)
router.get('/getBasic', inputRules, restaurantController.getBasic)

/* fetch data */
// 餐廳關鍵字
router.get('/fetchKeyword', inputRules, restaurantController.fetchKeyword)
// 用餐目的
router.get('/fetchPurpose', inputRules, restaurantController.fetchPurpose)
// 菜餚類別
router.get('/fetchType', inputRules, restaurantController.fetchType)
// 地區美食
router.get('/fetchDish', inputRules, restaurantController.fetchDish)
// basic
router.get('/fetchBasic', inputRules, restaurantController.fetchBasic)

module.exports = router
