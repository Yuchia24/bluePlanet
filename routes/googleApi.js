const express = require('express')
const router = express.Router()
const googleController = require('../controllers/googleController')

router.get('/placeid/:placeId', googleController.getDetails)

module.exports = router
