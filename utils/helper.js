const axios = require('axios')

const baseURL = 'http://demo.blueplanet.com.tw:11693/'

const apiHelper = axios.create({
  baseURL,
  timeout: 60000
})

module.exports = apiHelper
