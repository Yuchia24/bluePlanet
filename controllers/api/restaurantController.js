const apiHelper = require('../../utils/helper')
const token = process.env.token
const qs = require('qs')

const {
  vender_input_data,
  vender_cuisine_dish_rawData,
  vender_cuisine_type_rawData,
  vender_restaurant_keyword_rawData,
  vender_restaurant_review_rawData,
  vender_suitable_purpose_rawData,
  venders
} = require('../../models')

const { BadRequest, BluePlanetError } = require('../../utils/errors')
const errorCodes = require('../../utils/errorCodes')

const vender_id = 1
const dataUpdateTimeLimit = '7d'
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
      // ./purpose?restaurant_id={restaurantId}
      const { restaurant_id } = req.query

      const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id } })

      if (!restaurant) {
        throw new BadRequest(errorCodes.exception_3.errorCode, errorCodes.exception_3.message)
      }

      if (restaurant.purpose) {
        return res.status(200).json({
          status: 'success',
          result: JSON.parse(restaurant.purpose)
        })
      } else {
        const response = await getVenderData(venderUrl.purpose, restaurant.restaurant_name)
        if (!response) {
          throw new BluePlanetError(errorCodes.exception_4.errorCode, errorCodes.exception_4.message)
        }
        // 存入 raw data table
        await vender_suitable_purpose_rawData.create({
          vender_id,
          restaurant_id,
          posted_data: JSON.stringify({ data: restaurant.restaurant_name }),
          suitable_purpose_data: JSON.stringify({ data: response })
        })

        // update vender_input_data
        await vender_input_data.update({
          purpose: JSON.stringify(response.result)
        }, { where: { restaurant_id } })

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
        const response = await getVenderData(venderUrl.keyword, restaurant.restaurant_name)
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

        // update vender_input_data
        await vender_input_data.update({
          type: JSON.stringify(response.result)
        }, { where: { restaurant_id } })

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
        const response = await getVenderData(venderUrl.keyword, restaurant.restaurant_name)
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

        // update vender_input_data
        await vender_input_data.update({
          dish: JSON.stringify(response.result)
        }, { where: { restaurant_id } })

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

const getVenderData = async (url, kw) => {
  try {
    const res = await apiHelper.post(url, qs.stringify({ token, kw }))
    return res.data
  } catch (err) {
    // 紀錄 log
    throw new BluePlanetError(errorCodes.exception_5.errorCode, err.response.data.error)
  }
}

module.exports = restaurantController
