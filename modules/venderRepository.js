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
const baseURL = 'http://demo.blueplanet.com.tw:11693'

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
          api_url: baseURL.concat(api_url),
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
          address: response_data.address,
          country: response_data.country,
          formatted_phone_number: response_data.formatted_phone_number,
          name: response_data.name,
          price_level: response_data.price_level,
          rating: response_data.rating,
          user_ratings_total: response_data.user_ratings_total,
          route: response_data.route,
          locationLat: response_data.geometry.location.lat,
          locationLng: response_data.geometry.location.lng,
          website: response_data.website
        }))
      }
    })
  }

  insertComments (restaurant_id, comments) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new Error('no value'))
      } else {
        comments = comments.map((comment) => ({
          restaurant_id,
          author: comment.author,
          comment_time: comment.comment_time,
          content: comment.content,
          star: comment.star
        }))
        resolve(restaurant_comments.bulkCreate(comments))
      }
    })
  }

  insertOpeningHours (restaurant_id, hours) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new Error('no value'))
      } else {
        hours = hours.map((hour, index, array) => {
          console.log('hour', hour)
          return {
            restaurant_id,
            day: hour.close.day,
            startTime: hour.open.time,
            endTime: hour.close.time
          }
        })
        resolve(restaurant_openingHours.bulkCreate(hours))
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

  insertBasicExtend (array, restaurant_id, group, url) {
    return new Promise((resolve, reject) => {
      const inputArray = array.map((item) => {
        if (url) {
          // group = 'photo'
          return {
            restaurant_id,
            group,
            value: baseURL.concat(url, '/', item.photo_reference)
          }
        } else {
          // group = keyword
          return {
            restaurant_id,
            group,
            value: item.word,
            count: item.count
          }
        }
      })
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
