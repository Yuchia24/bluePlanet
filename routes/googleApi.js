const express = require('express')
const router = express.Router()
const googleControler = require('../controllers/googleControler')



router.get('/placeid/:placeId', googleControler.getDetails)


module.exports = router
