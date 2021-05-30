const { query } = require('express-validator')
const { BadRequest } = require('../utils/errors')
const errorCodes = require('../utils/errorCodes')
const { vender_input_data } = require('../models')

const inputRules = async (req, res, next) => {
  await query('restaurant_id').exists({ checkFalsy: true })
    .custom(async (value) => {
      if (!value) {
        console.log('validator')
        throw new BadRequest(errorCodes.exception_1.errorCode, errorCodes.exception_1.message)
      }
      if (!Number.isInteger(Number(value))) {
        console.log('validator 2')
        throw new BadRequest(errorCodes.exception_2.errorCode, errorCodes.exception_2.message)
      }
      return true
    }).run(req)

  // await query('restaurant_id')
  //   .custom(async (id) => {
  //     const restaurant = await vender_input_data.findOne({ raw: true, where: { restaurant_id: id } })
  //     console.log('restaurant', restaurant)
  //     if (!restaurant) {
  //       console.log('validator 3')
  //       throw new BadRequest(errorCodes.exception_3.errorCode, errorCodes.exception_3.message)
  //     }
  //   }).run(req)
  next()
}

module.exports = {
  inputRules
}
