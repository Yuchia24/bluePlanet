const { GeneralError } = require('../utils/errors')

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      errorCode: err.errorCode,
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: err.message
  })
}

module.exports = handleErrors
