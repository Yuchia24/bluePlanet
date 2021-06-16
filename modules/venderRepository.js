const {
  vender_enum,
  vender_items,
  vender_rawData,
  restaurant_basic_extend,
  restaurant_basic,
  restaurant_comments,
  restaurant_openingHours
} = require('../models')

const vender_id = 1

module.exports = class VenderRepository {
  getVenderItemOriginals (restaurant_id, kind) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !kind) {
        reject(new Error('no value'))
      } else {
        resolve(vender_items.findAll({
          raw: true,
          attributes: ['count', 'keyId'],
          where: {
            restaurant_id,
            kind
          }
        }))
      }
    })
  }

  getBasicExtendOriginals (restaurant_id, group) {
    return new Promise((resolve, reject) => {
      resolve(restaurant_basic_extend.findAll({
        raw: true,
        attributes: ['count', 'value'],
        where: {
          restaurant_id,
          group
        }
      }))
    })
  }

  insertRawData (restaurant_id, posted_data, response_data, api_url, status) {
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

  insertVenderItems (array, restaurant_id, restaurant_name, kind) {
    return new Promise((resolve, reject) => {
      const newArray = array.map((item) => ({
        vender_id,
        restaurant_id,
        restaurant_name,
        kind,
        keyId: item.keyId,
        count: item.count
      }))
      resolve(vender_items.bulkCreate(newArray))
    })
  }

  insertBasicExtend (array, restaurant_id, group) {
    return new Promise((resolve, reject) => {
      const inputArray = array.map((item) => ({
        restaurant_id,
        group,
        value: item.word,
        count: item.count
      }))
      resolve(restaurant_basic_extend.bulkCreate(inputArray))
    })
  }

  removeVenderItems (array, restaurant_id, kind) {
    return new Promise((resolve, reject) => {
      const removeArray = array.map((item) => item.keyId)
      resolve(
        vender_items.destroy({
          where: {
            restaurant_id,
            kind,
            keyId: removeArray
          }
        })
      )
    })
  }

  removeBasicExtend (array, restaurant_id, group) {
    return new Promise((resolve, reject) => {
      const removeArray = array.map((item) => item.value)
      resolve(
        restaurant_basic_extend.destroy({
          where: {
            restaurant_id,
            group,
            value: removeArray
          }
        })
      )
    })
  }
}
