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
  }
}
