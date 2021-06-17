const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const GoogleService = require('../service/googleService')
const googleService = new GoogleService()
<<<<<<< HEAD:controllers/googleController.js
=======
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]

const { BadRequest, BluePlanetError } = require('../utils/errors')
const errorCodes = require('../utils/errorCodes')

const keywordMinNum = 40
>>>>>>> fae28c7766a1d7f3e87dd163ff2a6ad94dd239d0:controllers/googleControler.js

const GoogleUrl = {
  details: `https://maps.googleapis.com/maps/api/place/details/json?language=zh-TW&fields=formatted_address,rating,price_level,geometry,formatted_phone_number,name,user_ratings_total,website&key=${config.googleAPIKey}`
}

const googleController = {

  getDetails: async (req, res, next) => {
    try {
      // 跟Google要資料
      const { response, status } = await googleService.getVenderData(GoogleUrl.details, req.params.placeId)
      const googleApiModel = {
        address: response.result.formatted_address,
        formatted_phone_number: response.result.formatted_phone_number,
        name: response.result.name,
        price_level: response.result.price_level,
        rating: response.result.rating,
        user_ratings_total: response.result.user_ratings_total,
        locationLat: response.result.geometry.location.lat,
        locationLng: response.result.geometry.location.lng,
        website: response.result.website
      }

      // 新增 raw Google API data
      await venderRepository.insertGoogleDetails(googleApiModel)

      // return data
      return res.status(200).json({
        status: 'success',
        response: response.result
      })
    } catch (error) {
      // 紀錄log
      console.log(error)
    }
  }

}

module.exports = googleController
