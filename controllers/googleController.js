const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const GoogleService = require('../service/googleService')
const googleService = new GoogleService()

const GoogleUrl = {
  details: 'https://maps.googleapis.com/maps/api/place/details/json?language=zh-TW&fields=formatted_address,rating,price_level,geometry,formatted_phone_number,name,user_ratings_total,website&key=AIzaSyAcNoyMhP8l_6xLW2ycrzafVqn_NldQ27Y'
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
