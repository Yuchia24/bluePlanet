module.exports = {
  /* BadRequest */
  // no keyword input
  exception_1: {
    errorCode: '101',
    message: 'Missing keyword for request'
  },
  // keyword not a number
  exception_2: {
    errorCode: '102',
    message: 'keyword invalid'
  },
  exception_3: {
    errorCode: '103',
    message: 'No match restaurant'
  },
  /* BluePlanetError */
  // return empty result
  exception_4: {
    errorCode: '201',
    message: 'No match data for your input'
  },
  // kw or token mistake, unknown error
  exception_5: {
    errorCode: '202'
  }
}
