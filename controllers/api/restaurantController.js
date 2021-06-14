const apiHelper = require('../../utils/helper')
const token = process.env.token
const qs = require('qs')

const { getOriginalRecords, insertRawData, insertNewRecords, findKeyName } = require('../../modules/common')

const {
  vender_input_data,
  vender_enum,
  vender_items,
  vender_rawData
} = require('../../models')

const { BadRequest, BluePlanetError } = require('../../utils/errors')
const errorCodes = require('../../utils/errorCodes')

const keywordMinNum = 40

const venderUrl = {
  keyword: '/all_kw',
  purpose: '/purpose',
  type: '/type',
  dish: '/dish'
}

const restaurantController = {
  getKeyword: async (req, res, next) => {
    try {
      // ./keywords?restaurant_id={restaurant_id}
      const { restaurant_id } = req.query

      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      // 餐廳不存在 vender DB
      if (!restaurant) {
        throw new BadRequest(errorCodes.exception_3.errorCode, errorCodes.exception_3.message)
      }
      // 餐廳資料已存在 vender DB
      if (restaurant.keyword) {
        return res.status(200).json({
          status: 'success',
          result: JSON.parse(restaurant.keyword)
        })
      } else {
        // 餐廳資料不存在 -> call 藍星球 API
        const response = await getVenderData(venderUrl.keyword, restaurant.restaurant_name)
        // 沒有回傳資料
        if (!response) {
          throw new BluePlanetError(errorCodes.exception_4.errorCode, errorCodes.exception_4.message)
        }

        // 存入 raw data table
        await vender_restaurant_keyword_rawData.create({
          vender_id,
          restaurant_id,
          posted_data: JSON.stringify({ data: restaurant.restaurant_name }),
          keyword_data: JSON.stringify({ data: response })
        })

        // update vender_input_data
        await vender_input_data.update({
          keyword: JSON.stringify(response.result)
        }, { where: { restaurant_id } })

        const responseData = {
          status: 'success',
          result: response.result
        }
        // keyword number under keywordMinNum
        if (response.result.length < keywordMinNum) {
          responseData.errorCode = errorCodes.exception_6.errorCode
          responseData.message = errorCodes.exception_6.message
        }

        return res.status(200).json(responseData)
      }
    } catch (error) {
      next(error)
    }
  },
  getPurpose: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query

      // 要從 data1 拉資料
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })

      const originalRecords = await getOriginalRecords(restaurant_id, 'purpose')
      console.log('originalRecords', originalRecords)
      if (originalRecords.length) {
        const resultPromise = originalRecords.map(async (record) => {
          const word = await findKeyName(record.keyId, 'purpose')
          return {
            count: record.count,
            word: word.value
          }
        })
        const result = await Promise.all(resultPromise)

        return res.status(200).json({
          status: 'success',
          response: {
            restaurant_id,
            restaurant_name: restaurant.restaurant_name,
            result
          }
        })
      } else {
        // 要存成全域變數
        const types = await vender_enum.findAll({ raw: true })

        const response = await getVenderData(venderUrl.purpose, restaurant_id, restaurant.restaurant_name)
        if (!response.result.length) {
          return console.log('no response data')
        }
        /* 比較新舊資料 */
        // 新資料
        const newRecords = response.result.map((item) => ({
          count: item.count,
          keyId: types.find((type) => type.value === item.word).keyId
        }))

        // 找出需新增的資料
        const inputData = newRecords.filter((record) => {
          return !originalRecords.map((oldRecord) => oldRecord.keyId).includes(record.keyId)
        })
        console.log('inputData', inputData)
        // // 找出需刪除的資料
        // const deleteData = originalRecords.filter((record) => {
        //   return !newRecords.map((newRecord) => newRecord.keyId).includes(record.keyId)
        // })

        // insert into vender_items
        const recordPromises = inputData.map((item) => insertNewRecords(item, restaurant_id, restaurant.restaurant_name, 'purpose'))
        await Promise.all(recordPromises)

        return res.status(200).json({
          status: 'success',
          result: response.result
        })
      }
    } catch (error) {
      next(error)
    }
  },
  getType: async (req, res, next) => {
    try {
      // ./type?restaurant_id={restaurantId}
      const { restaurant_id } = req.query

      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new BadRequest(errorCodes.exception_3.errorCode, errorCodes.exception_3.message)
      }
      if (restaurant.type) {
        return res.status(200).json({
          status: 'success',
          result: JSON.parse(restaurant.type)
        })
      } else {
        // 取得 types 資料
        const types = await vender_enum.findAll({ raw: true })
        console.log('types', types)

        const response = await getVenderData(venderUrl.type, restaurant.restaurant_name)
        if (!response) {
          throw new BluePlanetError(errorCodes.exception_4.errorCode, errorCodes.exception_4.message)
        }
        // 存入 raw data table
        await vender_cuisine_type_rawData.create({
          vender_id,
          restaurant_id,
          posted_data: JSON.stringify({ data: restaurant.restaurant_name }),
          cuisine_type_data: JSON.stringify({ data: response })
        })

        const newResult = response.result.map((item) => ({
          count: item.count,
          keyId: types.find((type) => type.value === item.type).keyId
        }))

        // 存入 vender_items
        newResult.forEach(async (result) => {
          try {
            await vender_items.create({
              restaurant_id,
              restaurant_name: restaurant.restaurant_name,
              kind: 'type',
              keyId: result.keyId,
              count: result.count
            })
          } catch (error) {
            console.log(error)
          }
        })

        return res.status(200).json({
          status: 'success',
          result: response.result
        })
      }
    } catch (error) {
      next(error)
    }
  },
  getDish: async (req, res, next) => {
    try {
      // ./dish?restaurant_id={restaurantId}
      const { restaurant_id } = req.query
      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })
      if (!restaurant) {
        throw new BadRequest(errorCodes.exception_3.errorCode, errorCodes.exception_3.message)
      }
      if (restaurant.dish) {
        return res.status(200).json({
          status: 'success',
          result: JSON.parse(restaurant.dish)
        })
      } else {
        const types = await vender_enum.findAll({ raw: true })

        const response = await getVenderData(venderUrl.dish, restaurant.restaurant_name)
        // 沒有回傳資料
        if (!response) {
          throw new BluePlanetError(errorCodes.exception_4.errorCode, errorCodes.exception_4.message)
        }
        // 存入 raw data table
        await vender_cuisine_dish_rawData.create({
          vender_id,
          restaurant_id,
          posted_data: JSON.stringify({ data: restaurant.restaurant_name }),
          cuisine_dish_data: JSON.stringify({ data: response })
        })

        const newResult = response.result.map((item) => ({
          count: item.count,
          keyId: types.find((type) => type.value === item.word).keyId
        }))

        // vender_items
        newResult.forEach(async (result) => {
          try {
            await vender_items.create({
              restaurant_id,
              restaurant_name: restaurant.restaurant_name,
              kind: 'dish',
              keyId: result.keyId,
              count: result.count
            })
          } catch (error) {
            console.log(error)
          }
        })

        return res.status(200).json({
          status: 'success',
          result: response.result
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

const getVenderData = async (url, restaurant_id, kw) => {
  try {
    const res = await apiHelper.post(url, qs.stringify({ token, kw }))
    await insertRawData(restaurant_id, kw, res.data, url, res.status)
    return res.data
  } catch (err) {
    // 紀錄 log
    throw new BluePlanetError(errorCodes.exception_5.errorCode, err.response.data.error)
  }
}

module.exports = restaurantController
