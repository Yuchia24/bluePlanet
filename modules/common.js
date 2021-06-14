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

const findKeyName = (keyId, kind) => {
  return new Promise((resolve, reject) => {
    if (!keyId || !kind) {
      reject(new Error('error'))
    } else {
      const word = vender_enum.findOne({
        raw: true,
        attributes: ['value'],
        where: {
          kind,
          keyId
        }
      })
      resolve(word)
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

const insertNewRecords = (data, restaurant_id, restaurant_name, kind) => {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error('no value'))
    } else {
      resolve(vender_items.create({
        vender_id,
        restaurant_id,
        restaurant_name,
        kind,
        keyId: data.keyId,
        count: data.count
      }))
    }
  })
}

const removeOldRecords = (dataArray, restaurant_id, kind) => {
  return new Promise((resolve, reject) => {
    if (!dataArray.length) {
      reject(new Error('no value'))
    } else {
      dataArray.forEach((data) => {
        try {
          resolve(vender_items.destroy({
            where: {
              restaurant_id,
              kind,
              keyId: data.keyId
            }
          }))
        } catch (error) {
          console.log(error)
        }
      })
    }
  })
}

module.exports = { getOriginalRecords, insertRawData, insertNewRecords, removeOldRecords, findKeyName }
