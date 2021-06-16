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

async function myFunc () {
  try {
    const extend = await restaurant_basic_extend.findAll()
    const basic = await restaurant_basic.findAll()
    const comments = await restaurant_comments.findAll()
    const hours = await restaurant_openingHours.findAll()
    console.log('extend', extend, 'basic', basic, 'comments', comments, 'hours', hours)
  } catch (error) {
    console.log(error)
  }
}

myFunc()

module.exports = class VenderRepository {
  getOriginalRecords (restaurant_id, kind) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !kind) {
        reject(new Error('no value'))
      } else {
        resolve(vender_items.findAll({
          raw: true,
          attributes: ['count', 'keyId'],
          where: {
            restaurant_id, kind
          }
        }))
      }
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

  insertNewRecords (array, restaurant_id, restaurant_name, kind) {
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

  removeOldRecords (array, restaurant_id, kind) {
    return new Promise((resolve, reject) => {
      const newArray = array.map((item) => item.keyId)
      resolve(
        vender_items.destroy({
          where: {
            restaurant_id,
            kind,
            keyId: newArray
          }
        })
      )
    })
  }
}
