class GeneralError extends Error {
  constructor(code, message) {
    super()
    this.errorCode = code
    this.message = message
  }

  getCode () {
    // input keyword invalid
    if (this instanceof BadRequest) {
      return 400
    }
    // blue planet token error, kw error, server error, return empty result
    if (this instanceof BluePlanetError) {
      return 502
    }

    // unexpected error
    return 500
  }
}

class BadRequest extends GeneralError { }
class BluePlanetError extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  BluePlanetError
}
