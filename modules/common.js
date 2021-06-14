const { vender_enum, vender_items, vender_rawData } = require('../models')

const vender_id = 1

const getOriginalRecords = (restaurant_id, kind) => {
  return new Promise((resolve, reject) => {
    if (!restaurant_id || !kind) {
      reject(new Error('no value'))
    } else {
      resolve(vender_items.findAll({
        raw: true,
        where: {
          restaurant_id, kind
        }
      }))
    }
  })
}

const insertRawData = (restaurant_id, posted_data, response_data, api_url, status) => {
  return new Promise((resolve, reject) => {
    if (!restaurant_id || !posted_data || !api_url) {
      reject(new Error('no value'))
    } else {
      resolve(vender_rawData.create({
        vender_id,
        restaurant_id,
        posted_data: JSON.stringify({ data: posted_data }),
        response_data: JSON.stringify(response_data),
        api_url,
        status
      }))
    }
  })
}

module.exports = { getOriginalRecords, insertRawData }
