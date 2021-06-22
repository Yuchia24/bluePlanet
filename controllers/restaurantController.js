const VenderRepository = require('../modules/venderRepository')
const venderRepository = new VenderRepository()
const BusinessService = require('../service/businessService')
const businessService = new BusinessService()
const RestaurantService = require('../service/restaurantService')
const restaurantService = new RestaurantService()

const UPDATE_TIME_LIMIT = 90
const today = Date.now()

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
      const result = await businessService.syncPurpose(restaurant_id)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  fetchType: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const result = await businessService.syncType(restaurant_id)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  fetchDish: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const result = await businessService.syncDish(restaurant_id)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  fetchBasic: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      const result = await businessService.syncBasic(restaurant_id)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getKeyword: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      let result = await venderRepository.getBasicExtendRecords(restaurant_id, 'keyword')
      if (!result.length || (today - result[0].updatedAt) / 86400000 > UPDATE_TIME_LIMIT) {
        result = await businessService.syncKeyword(restaurant_id)
      }
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getPurpose: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      let result = await venderRepository.getVenderItemRecords(restaurant_id, 'purpose')
      if (!result.length || (today - result[0].updatedAt) / 86400000 > UPDATE_TIME_LIMIT) {
        console.log('result 2', result)
        result = await businessService.syncPurpose(restaurant_id)
      } else {
        result = await restaurantService.findKeyName(result)
      }

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getType: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      let result = await venderRepository.getVenderItemRecords(restaurant_id, 'type')
      if (!result.length || (today - result[0].updatedAt) / 86400000 > UPDATE_TIME_LIMIT) {
        result = await businessService.syncType(restaurant_id)
      } else {
        result = await restaurantService.findKeyName(result)
      }

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getDish: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query
      // query records from database
      let result = await venderRepository.getVenderItemRecords(restaurant_id, 'dish')
      // records not exist or updatedAt > 90 days -> call sync
      if (!result.length || (today - result[0].updatedAt) / 86400000 > UPDATE_TIME_LIMIT) {
        console.log('result 2', result)
        result = await businessService.syncDish(restaurant_id)
      } else {
        result = await restaurantService.findKeyName(result)
      }

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getBasic: async (req, res, next) => {
    try {
      const { restaurant_id } = req.query

      let result = await venderRepository.getBasicRecords(restaurant_id)
      if (!result.basic || (today - result.basic.updatedAt) / 86400000 > UPDATE_TIME_LIMIT) {
        result = await businessService.syncBasic(restaurant_id)
      }

      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = restaurantController
