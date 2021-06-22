const { query, validationResult } = require('express-validator')
const { BadRequest, NotFound } = require('../utils/errors')
const RestaurantService = require('../service/restaurantService')
const restaurantService = new RestaurantService()

const inputRules = async (req, res, next) => {
  await query('restaurant_id').exists({ checkFalsy: true })
    .custom(async (value) => {
      if (!value) {
        throw new BadRequest('Missing keyword for request.')
      }
      if (!Number.isInteger(Number(value))) {
        throw new BadRequest('keyword invalid')
      }
      const restaurant_name = await restaurantService.getRestaurantInfo(value)
      console.log('validator', restaurant_name)
      if (!restaurant_name) {
        throw new NotFound('This restaurant does not exist.')
      }
      return true
    }).run(req)

  // await query('restaurant_id')
  //   .custom(async (id) => {
  //     const restaurant_name = await restaurantService.getRestaurantInfo(id)
  //     console.log('validator', restaurant_name)
  //     if (!restaurant_name) {
  //       throw new NotFound('This restaurant does not exist.')
  //     }
  //   }).run(req)

  return validResultCheck(req, res, next)
}

function validResultCheck (req, res, next) {
  const errorResults = validationResult(req)
  if (errorResults.isEmpty()) return next()

  console.log('errorResults', errorResults)
  const errors = errorResults.errors.map(error => error.msg)
  return res.status(400).json({
    status: 'error',
    message: `${errors}`
  })
}

module.exports = {
  inputRules
}
