const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const VenderService = require('../service/venderService')
const venderService = new VenderService()
const RestaurantService = require('../service/restaurantService')
const restaurantService = new RestaurantService()

// const { BadRequest, BluePlanetError } = require('../utils/errors')
// const errorCodes = require('../utils/errorCodes')

const { vender_input_data } = require('../models')

const venderUrl = {
  keyword: '/all_kw',
  purpose: '/purpose',
  type: '/type',
  dish: '/dish'
}

const restaurantController = {
  getKeyword: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      // 要改成從 data1 拉資料
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      const { response, status } = await venderService.getVenderData(venderUrl.keyword, restaurant.restaurant_name)
      console.log('response', response.result)
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
      await venderRepository.insertBasicExtend(inputData, restaurant_id, 'keyword')
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
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.purpose, restaurant.restaurant_name)
      console.log(response.result)
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
      console.log(error)
    }
  },
  getType: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query

      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.type, restaurant.restaurant_name)
      console.log('response', response)
      // 抓取舊資料
      const originalRecords = await venderRepository.getVenderItemOriginals(restaurant_id, 'type')
      console.log('originalRecords', originalRecords)
      /* 新舊資料比對 */
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      console.log('newRecords', newRecords)

      // newRecords 與 originalRecords 比較 -> get inputData
      const inputData = await restaurantService.getInputData(originalRecords, newRecords)
      console.log('inputData', inputData)

      // originalRecords 與 newRecords 比較 -> get removeData
      const removeData = await restaurantService.getRemoveData(originalRecords, newRecords)
      console.log('removeData', removeData)

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
      // 跟藍星球要資料
      const { response, status } = await venderService.getVenderData(venderUrl.dish, restaurant.restaurant_name)
      console.log('response', response)
      // 抓取舊資料
      const originalRecords = await venderRepository.getVenderItemOriginals(restaurant_id, 'dish')
      console.log('originalRecords', originalRecords)
      /* 新舊資料比對 */
      // 新資料 -> response data 配對 keyId
      const newRecords = await restaurantService.matchKeyId(response.result)
      console.log('newRecords', newRecords)

      // newRecords 與 originalRecords 比較 -> get inputData
      const inputData = await restaurantService.getInputData(originalRecords, newRecords)
      console.log('inputData', inputData)

      // originalRecords 與 newRecords 比較 -> get removeData
      const removeData = await restaurantService.getRemoveData(originalRecords, newRecords)
      console.log('removeData', removeData)

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
  }
}

module.exports = restaurantController
