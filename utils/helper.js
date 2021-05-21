const axios = require('axios')

const baseURL = 'http://demo.blueplanet.com.tw:11693/#/restaurant'

const apiHelper = axios.create({
  baseURL
})

module.exports = apiHelper
