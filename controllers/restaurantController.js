const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const VenderService = require('../service/venderService')
const venderService = new VenderService()
const RestaurantService = require('../service/restaurantService')
const restaurantService = new RestaurantService()
const BusinessService = require('../service/businessService')
const businessService = new BusinessService()

const { BluePlanetError, NotFound } = require('../utils/errors')

const { vender_input_data } = require('../models')

const UPDATE_TIME_LIMIT = 90
const today = Date.now()

const venderUrl = {
  keyword: '/all_kw',
  purpose: '/purpose',
  type: '/type',
  dish: '/dish',
  basic: '/basic',
  pic: '/pic'
}

const restaurantController = {
  fetchKeyword: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const result = await businessService.syncKeyword(restaurant_id)

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  fetchPurpose: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      // 要改成從 data1 拉資料
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
      const originalRecords = await venderRepository.getVenderItemOriginals(restaurant_id, 'purpose')
      /* 新舊資料比對 */
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      // newRecords 與 originalRecords 比較 -> get inputData
      const inputData = await restaurantService.getInputData(originalRecords, newRecords)
      // originalRecords 與 newRecords 比較 -> get removeData
      const removeData = await restaurantService.getRemoveData(originalRecords, newRecords)
      // 新增 raw data
      venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.purpose, status)
      // 新增及刪除 vender_items
      venderRepository.insertVenderItems(inputData, restaurant_id, restaurant.restaurant_name, 'purpose')
      venderRepository.removeVenderItems(removeData, restaurant_id, 'purpose')
      // return data
      return res.status(200).json({
        status: 'success',
        response: {
          restaurant_id,
          restaurant_name: restaurant.restaurant_name,
          result: response.result
        }
      })
    } catch (error) {
      // 紀錄log
      next(error)
    }
  },
  fetchType: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
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
      const originalRecords = await venderRepository.getVenderItemOriginals(restaurant_id, 'type')

      /* 新舊資料比對 */
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      // newRecords 與 originalRecords 比較 -> get inputData
      const inputData = await restaurantService.getInputData(originalRecords, newRecords)
      // originalRecords 與 newRecords 比較 -> get removeData
      const removeData = await restaurantService.getRemoveData(originalRecords, newRecords)
      // 新增 raw data
      venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.type, status)
      // 新增及刪除 vender_items
      venderRepository.insertVenderItems(inputData, restaurant_id, restaurant.restaurant_name, 'type')
      venderRepository.removeVenderItems(removeData, restaurant_id, 'type')
      // return data
      return res.status(200).json({
        status: 'success',
        response: {
          restaurant_id,
          restaurant_name: restaurant.restaurant_name,
          result: response.result
        }
      })
    } catch (error) {
      next(error)
    }
  },
  fetchDish: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.dish, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }
      // 抓取舊資料
      const originalRecords = await venderRepository.getVenderItemOriginals(restaurant_id, 'dish')
      /* 新舊資料比對 */
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      // newRecords 與 originalRecords 比較 -> get inputData
      const inputData = await restaurantService.getInputData(originalRecords, newRecords)
      // originalRecords 與 newRecords 比較 -> get removeData
      const removeData = await restaurantService.getRemoveData(originalRecords, newRecords)
      // 新增 raw data
      venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.dish, status)
      // 新增及刪除 vender_items
      venderRepository.insertVenderItems(inputData, restaurant_id, restaurant.restaurant_name, 'dish')
      venderRepository.removeVenderItems(removeData, restaurant_id, 'dish')
      // return data
      return res.status(200).json({
        status: 'success',
        response: {
          restaurant_id,
          restaurant_name: restaurant.restaurant_name,
          result: response.result
        }
      })
    } catch (error) {
      next(error)
    }
  },
  fetchBasic: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.basic, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }

      // get original data (comments, photos, opening_hours)
      const hourRecords = await venderRepository.getHourOriginals(restaurant_id)
      const photos = await venderRepository.getPhotoOriginals(restaurant_id)
      const comments = await venderRepository.getCommentOriginals(restaurant_id)

      // 新增 raw data
      venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.basic, status)

      // update basic
      venderRepository.updateBasic(restaurant_id, response.result)
      // update openingHours
      venderRepository.updateOpeningHours(restaurant_id, response.result.opening_hours.periods, hourRecords)
      // update comments
      venderRepository.updateComments(restaurant_id, response.result.comments_highest.good, comments)
      // update photos
      venderRepository.updateBasicExtend(response.result.photos, restaurant_id, 'photo', venderUrl.pic, photos)

      // return
      return res.status(200).json({
        status: 'success',
        response: {
          restaurant_id,
          restaurant_name: restaurant.restaurant_name,
          result: response.result
        }
      })
    } catch (error) {
      next(error)
    }
  },

  getKeyword: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      let result = await venderRepository.getBasicExtendOriginals(restaurant_id, 'keyword')
      if (!result.length || (today - result[0].updatedAt) / 86400000 > UPDATE_TIME_LIMIT) {
        console.log('result2')
        result = await businessService.syncKeyword(restaurant_id)
      }

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = restaurantController
