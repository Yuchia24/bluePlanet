class GeneralError extends Error {
  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }

  getCode () {
    // miss keyword or wrong keyword
    if (this instanceof BadRequest) {
      return 400
    }
    // blue planet return empty result
    if (this instanceof NotFound) {
      return 404
    }
    // token error, kw error, server error
    if (this instanceof BluePlanetError) {
      return 502
    }

    // unexpected error
    return 500
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class BluePlanetError extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  BluePlanetError
}
