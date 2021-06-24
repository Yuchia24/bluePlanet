const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const VenderService = require('./venderService')
const venderService = new VenderService()
const RestaurantService = require('./restaurantService')
const restaurantService = new RestaurantService()

const { BluePlanetError } = require('../utils/errors')

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
    const restaurant_name = await restaurantService.getRestaurantInfo(restaurant_id)
    const { response, status } = await venderService.getVenderData(venderUrl.keyword, restaurant_name)
    if (status !== 200) {
      throw new BluePlanetError(response.error)
    }
    if (!response.result) {
      throw new BluePlanetError('Blue Planet return no value')
    }

    // get original records
    const originalRecords = await venderRepository.getBasicExtendRecords(restaurant_id, 'keyword')

    // 新增 raw data
    await venderRepository.insertRawData(restaurant_id, restaurant_name, response, venderUrl.keyword, status)
    // 新增 restaurant_basic_extend
    await venderRepository.updateBasicExtend(restaurant_id, response.result, originalRecords, 'keyword')
    // get data from db
    const result = await venderRepository.getBasicExtendRecords(restaurant_id, 'keyword')
    return result
  }

  async syncPurpose (restaurant_id) {
    const restaurant_name = await restaurantService.getRestaurantInfo(restaurant_id)
    // 跟藍星球要資料
    const { response, status } = await venderService.getVenderData(venderUrl.purpose, restaurant_name)
    if (status !== 200) {
      throw new BluePlanetError(response.error)
    }
    if (!response.result) {
      throw new BluePlanetError('Blue Planet return no value')
    }
    // 抓取舊資料
    const originalRecords = await venderRepository.getVenderItemRecords(restaurant_id, 'purpose')
    // 新資料 -> response data 配對 keyId
    const newRecords = await restaurantService.matchKeyId(response.result)
    // 新增 raw data
    await venderRepository.insertRawData(restaurant_id, restaurant_name, response, venderUrl.purpose, status)
    // 新增及刪除 vender_items
    await venderRepository.updateVenderItems(restaurant_id, newRecords, originalRecords, 'purpose', restaurant_name)
    let result = await venderRepository.getVenderItemRecords(restaurant_id, 'purpose')
    result = await restaurantService.findKeyName(result)
    return result
  }

  async syncType (restaurant_id) {
    const restaurant_name = await restaurantService.getRestaurantInfo(restaurant_id)
    // 跟藍星球要資料
    const { response, status } = await venderService.getVenderData(venderUrl.type, restaurant_name)
    if (status !== 200) {
      throw new BluePlanetError(response.error)
    }
    if (!response.result) {
      throw new BluePlanetError('Blue Planet return no value')
    }
    // 抓取舊資料
    const originalRecords = await venderRepository.getVenderItemRecords(restaurant_id, 'type')

    // 新資料 -> response data 配對 keyId
    const newRecords = await restaurantService.matchKeyId(response.result)
    // 新增 raw data
    await venderRepository.insertRawData(restaurant_id, restaurant_name, response, venderUrl.type, status)
    await venderRepository.updateVenderItems(restaurant_id, newRecords, originalRecords, 'type', restaurant_name)
    let result = await venderRepository.getVenderItemRecords(restaurant_id, 'type')
    result = await restaurantService.findKeyName(result)
    return result
  }

  async syncDish (restaurant_id) {
    const restaurant_name = await restaurantService.getRestaurantInfo(restaurant_id)
    const { response, status } = await venderService.getVenderData(venderUrl.dish, restaurant_name)
    if (status !== 200) {
      throw new BluePlanetError(response.error)
    }
    if (!response.result) {
      throw new BluePlanetError('Blue Planet return no value')
    }
    // 抓取舊資料
    const originalRecords = await venderRepository.getVenderItemRecords(restaurant_id, 'dish')
    // 新資料 -> response data 配對 keyId
    const newRecords = await restaurantService.matchKeyId(response.result)
    // 新增 raw data
    await venderRepository.insertRawData(restaurant_id, restaurant_name, response, venderUrl.dish, status)
    await venderRepository.updateVenderItems(restaurant_id, newRecords, originalRecords, 'dish', restaurant_name)
    let result = await venderRepository.getVenderItemRecords(restaurant_id, 'dish')
    result = await restaurantService.findKeyName(result)
    return result
  }

  async syncBasic (restaurant_id) {
    const restaurant_name = await restaurantService.getRestaurantInfo(restaurant_id)
    // 跟藍星球要資料
    const { response, status } = await venderService.getVenderData(venderUrl.basic, restaurant_name)
    console.log('response', response.result)
    if (status !== 200) {
      throw new BluePlanetError(response.error)
    }
    if (!response.result) {
      throw new BluePlanetError('Blue Planet return no value')
    }
    const { basic, comments, opening_hours, photos } = await venderRepository.getBasicRecords(restaurant_id)
    // 新增 raw data
    await venderRepository.insertRawData(restaurant_id, restaurant_name, response, venderUrl.basic, status)
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
  }
}
