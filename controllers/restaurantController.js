const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const VenderService = require('../service/venderService')
const venderService = new VenderService()
const RestaurantService = require('../service/restaurantService')
const restaurantService = new RestaurantService()

const { BluePlanetError, NotFound } = require('../utils/errors')

const { vender_input_data } = require('../models')

const venderUrl = {
  keyword: '/all_kw',
  purpose: '/purpose',
  type: '/type',
  dish: '/dish',
  basic: '/basic',
  pic: '/pic'
}
const restaurantController = {
  getKeyword: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      // 要改成從 data1 拉資料
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new NotFound('This restaurant does not exist.')
      }
      const { response, status } = await venderService.getVenderData(venderUrl.keyword, restaurant.restaurant_name)
      if (!response) {
        throw new BluePlanetError('Blue Planet return no value')
      }

      // get original records
      const originalRecords = await venderRepository.getBasicExtendOriginals(restaurant_id, 'keyword')

      /* 差異比對 */
      // get input data
      const inputData = await restaurantService.getInputData(originalRecords, response.result)

      // get remove data
      const removeData = await restaurantService.getRemoveData(originalRecords, response.result)

      // 新增 raw data
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.keyword, status)
      // 新增 restaurant_basic_extend
      await venderRepository.updateBasicExtend(inputData, restaurant_id, 'keyword')
      // 刪除 restaurant_basic_extend
      await venderRepository.removeBasicExtend(removeData, restaurant_id, 'keyword')
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
  getPurpose: async (req, res, next) => {
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
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.purpose, status)
      // 新增及刪除 vender_items
      await venderRepository.insertVenderItems(inputData, restaurant_id, restaurant.restaurant_name, 'purpose')
      await venderRepository.removeVenderItems(removeData, restaurant_id, 'purpose')
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
  getType: async (req, res, next) => {
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
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.type, status)
      // 新增及刪除 vender_items
      await venderRepository.insertVenderItems(inputData, restaurant_id, restaurant.restaurant_name, 'type')
      await venderRepository.removeVenderItems(removeData, restaurant_id, 'type')
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
  getDish: async (req, res, next) => {
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
      await venderRepository.insertRawData(restaurant_id, restaurant.restaurant_name, response, venderUrl.dish, status)
      // 新增及刪除 vender_items
      await venderRepository.insertVenderItems(inputData, restaurant_id, restaurant.restaurant_name, 'dish')
      await venderRepository.removeVenderItems(removeData, restaurant_id, 'dish')
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
  getBasic: async (req, res, next) => {
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
  }
}
module.exports = restaurantController
