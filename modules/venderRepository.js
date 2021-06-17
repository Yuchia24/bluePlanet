const {
  vender_enum,
  vender_items,
  vender_rawData,
  restaurant_basic_extend,
  restaurant_basic,
  restaurant_comments,
  restaurant_openingHours,
  google_details
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
  insertBasic (restaurant_id, response_data) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new Error('no value'))
      } else {
        resolve(restaurant_basic.create({
          restaurant_id,
          address: JSON.stringify(response_data.address),
          country: JSON.stringify(response_data.country),
          formatted_phone_number: JSON.stringify(response_data.formatted_phone_number),
          name: JSON.stringify(response_data.name),
          price_level: JSON.stringify(response_data.price_level),
          rating: JSON.stringify(response_data.rating),
          user_ratings_total: JSON.stringify(response_data.user_ratings_total),
          route: JSON.stringify(response_data.user_ratings_total),
          locationLat: JSON.stringify(response_data.geometry.location.lat),
          locationLng: JSON.stringify(response_data.geometry.location.lng),
          website: JSON.stringify(response_data.website)
        }))
      }
    })
  }
  insertBasicExtend (restaurant_id, posted_data, response_data, api_url, status) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !posted_data || !api_url) {
        reject(new Error('no value'))
      } else {
        resolve(restaurant_basic_extend.create({
          restaurant_id,
          group: 'photo',
          value: '123'
        }))
      }
    })
  }
  insertComment (restaurant_id, posted_data, response_data) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !posted_data) {
        reject(new Error('no value'))
      } else {
        resolve(restaurant_comments.create({
          restaurant_id,
          author: JSON.stringify(response_data.comments_highest.good.author),
          comment_time: JSON.stringify(response_data.comments_highest.good.comment_time),
          content: JSON.stringify(response_data.comments_highest.good.content),
          star: JSON.stringify(response_data.comments_highest.good.star)
        }))
      }
    })
  }
  insertOpeningHours (restaurant_id, posted_data, response_data) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !posted_data) {
        reject(new Error('no value'))
      } else {
        resolve(restaurant_openingHours.create({
          restaurant_id,
          day: JSON.stringify(response_data.comments_highest.good.author),
          startTime: JSON.stringify(response_data.comments_highest.good.comment_time),
          endTime: JSON.stringify(response_data.comments_highest.good.content)
        }))
      }
    })
  }
  insertGoogleDetails (response) {
    return new Promise((resolve, reject) => {
      resolve(google_details.create(
        response
      ))
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
      resolve(
        array.forEach((item) => {
          restaurant_basic_extend.destroy({
            where: {
              restaurant_id,
              group,
              value: item.value,
              count: item.count
            }
          })
        })
      )
    })
  }
}