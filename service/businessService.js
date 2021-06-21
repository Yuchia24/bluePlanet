const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const VenderService = require('./venderService')
const venderService = new VenderService()
const RestaurantService = require('./restaurantService')
const restaurantService = new RestaurantService()

const { vender_input_data } = require('../models')
const { BluePlanetError, NotFound } = require('../utils/errors')

const venderUrl = {
  keyword: '/all_kw',
  purpose: '/purpose',
  type: '/type',
  dish: '/dish',
  basic: '/basic',
  pic: '/pic'
}

module.exports = class BusinessService {
  async syncKeyword (restaurant_id) {
    try {
      console.log('restaurant_id', restaurant_id)
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      console.log('restaurant', restaurant)
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      const { response, status } = await venderService.getVenderData(venderUrl.keyword, restaurant.restaurant_name)
      console.log('response', response)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }

      // get original records
      const originalRecords = await venderRepository.getBasicExtendOriginals(restaurant_id, 'keyword')
      console.log('originalRecords', originalRecords)
      /* 差異比對 */
      // get input data
      const inputData = await restaurantService.getInputData(originalRecords, response.result)
      console.log('inputData', inputData)

      // get remove data
      const removeData = await restaurantService.getRemoveData(originalRecords, response.result)
      console.log('removeData', removeData)

      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.keyword, status)
      // 新增 restaurant_basic_extend
      await venderRepository.updateBasicExtend(inputData, restaurant_id, 'keyword')
      // 刪除 restaurant_basic_extend
      await venderRepository.removeBasicExtend(removeData, restaurant_id, 'keyword')
      // get data from db
      const result = await venderRepository.getBasicExtendOriginals(restaurant_id, 'keyword')

      return result
    } catch (error) {
      console.log(error)
    }
  }
}
