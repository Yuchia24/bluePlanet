const axios = require('axios')
const qs = require('qs')

const baseURL = 'http://demo.blueplanet.com.tw:11693/'

const apiHelper = axios.create({
  baseURL,
  data: (data) => {
    return qs.stringify(data)
  }
})

module.exports = apiHelper
