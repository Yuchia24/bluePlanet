// const CACHE_DURATION = 600
const CACHE_KEY = 'CACHE_KEY'
const NodeCache = require('node-cache')
const enumCache = new NodeCache()

const { vender_enum } = require('../models')

module.exports = class EnumService {
  getEnumCache () {
    return new Promise((resolve, reject) => {
      if (enumCache.has(CACHE_KEY)) {
        console.log('has cache')
        resolve(enumCache.get(CACHE_KEY))
      } else {
        console.log('no cache')
        resolve(vender_enum.findAll({ raw: true }))
      }
    })
  }
}