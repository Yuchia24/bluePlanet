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
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      const { response, status } = await venderService.getVenderData(venderUrl.keyword, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }

      // get original records
      const originalRecords = await venderRepository.getBasicExtendRecords(restaurant_id, 'keyword')

      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.keyword, status)
      // 新增 restaurant_basic_extend
      await venderRepository.updateBasicExtend(restaurant_id, response.result, originalRecords, 'keyword')
      // get data from db
      const result = await venderRepository.getBasicExtendRecords(restaurant_id, 'keyword')
      return result
    } catch (error) {
      return error
    }
  }

  async syncPurpose (restaurant_id) {
    try {
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.purpose, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }
      // 抓取舊資料
      const originalRecords = await venderRepository.getVenderItemRecords(restaurant_id, 'purpose')
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.purpose, status)
      // 新增及刪除 vender_items
      await venderRepository.updateVenderItems(restaurant_id, newRecords, originalRecords, 'purpose', restaurant.restaurant_name)
      let result = await venderRepository.getVenderItemRecords(restaurant_id, 'purpose')
      result = await restaurantService.findKeyName(result)
      return result
    } catch (error) {
      return error
    }
  }

  async syncType (restaurant_id) {
    try {
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.type, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }
      // 抓取舊資料
      const originalRecords = await venderRepository.getVenderItemRecords(restaurant_id, 'type')

      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.type, status)
      await venderRepository.updateVenderItems(restaurant_id, newRecords, originalRecords, 'type', restaurant.restaurant_name)
      let result = await venderRepository.getVenderItemRecords(restaurant_id, 'type')
      result = await restaurantService.findKeyName(result)
      return result
    } catch (error) {
      return error
    }
  }

  async syncDish (restaurant_id) {
    try {
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      const { response, status } = await venderService.getVenderData(venderUrl.dish, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }
      // 抓取舊資料
      const originalRecords = await venderRepository.getVenderItemRecords(restaurant_id, 'dish')
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.dish, status)
      await venderRepository.updateVenderItems(restaurant_id, newRecords, originalRecords, 'dish', restaurant.restaurant_name)
      let result = await venderRepository.getVenderItemRecords(restaurant_id, 'dish')
      result = await restaurantService.findKeyName(result)
      return result
    } catch (error) {
      return error
    }
  }

  async syncBasic (restaurant_id) {
    try {
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.basic, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }
      const { basic, comments, opening_hours, photos } = await venderRepository.getBasicRecords(restaurant_id)
      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.basic, status)
      // update basic
      await venderRepository.updateBasic(restaurant_id, response.result)
      // update openingHours
      await venderRepository.updateOpeningHours(restaurant_id, response.result.opening_hours.periods, opening_hours)
      // update comments
      await venderRepository.updateComments(restaurant_id, response.result.comments_highest.good, comments)
      // update photos
      await venderRepository.updateBasicExtend(restaurant_id, response.result.photos, photos, 'photo', venderUrl.pic)

      const result = await venderRepository.getBasicRecords(restaurant_id)
      return result
    } catch (error) {
      return error
    }
  }
}
