const { query, validationResult } = require('express-validator')
const { BadRequest } = require('../utils/errors')

const inputRules = async (req, res, next) => {
  await query('restaurant_id').exists({ checkFalsy: true })
    .custom(async (value) => {
      if (!value) {
        throw new BadRequest('Missing keyword for request')
      }
      if (!Number.isInteger(Number(value))) {
        throw new BadRequest('keyword invalid')
      }
      return true
    }).run(req)
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
