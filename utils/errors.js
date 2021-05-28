class GeneralError extends Error {
  constructor (message) {
    super()
    this.message = message
  }

  getCode () {
    if (this instanceof BadRequest) {
      return 400
    }
    if (this instanceof NotFound) {
      return 404
    }
    if (this instanceof InputInvalid) {
      return 403
    }
    return 500
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class InputInvalid extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  InputInvalid
}
