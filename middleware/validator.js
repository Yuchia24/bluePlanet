const { query, validationResult } = require('express-validator')
const { BadRequest } = require('../utils/errors')
const errorCodes = require('../utils/errorCodes')

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
  return validResultCheck(req, res, next)
}

function validResultCheck (req, res, next) {
  const errorResults = validationResult(req)
  if (errorResults.isEmpty()) return next()

  const errors = errorResults.errors.map(error => error.msg)
  return res.status(400).json({
    status: 'error',
    message: `${errors}`
  })
}

module.exports = {
  inputRules
}
