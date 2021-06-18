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

  getCommentOriginals (restaurant_id) {
    return new Promise((resolve, reject) => {
      resolve(
        restaurant_comments.findAll({
          raw: true,
          attributes: ['id'],
          where: { restaurant_id }
        })
      )
    })
  }

  getPhotoOriginals (restaurant_id) {
    return new Promise((resolve, reject) => {
      resolve(
        restaurant_basic_extend.findAll({
          raw: true,
          attributes: ['id'],
          where: { restaurant_id, group: 'photo' }
        })
      )
    })
  }

  getHourOriginals (restaurant_id) {
    return new Promise((resolve, reject) => {
      resolve(
        restaurant_openingHours.findAll({
          raw: true,
          attributes: ['id'],
          where: { restaurant_id }
        })
      )
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

  updateBasic (restaurant_id, data) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new Error('no value'))
      } else {
        resolve(restaurant_basic.update({
          address: data.address,
          country: data.country,
          formatted_phone_number: data.formatted_phone_number,
          name: data.name,
          price_level: data.price_level,
          rating: data.rating,
          user_ratings_total: data.user_ratings_total,
          route: data.route,
          locationLat: data.geometry.location.lat,
          locationLng: data.geometry.location.lng,
          website: data.website
        }, { where: { restaurant_id } }))
      }
    })
  }

  updateComments (restaurant_id, newRecords, oldRecords) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new Error('no value'))
      } else {
        newRecords = newRecords.map((comment) => ({
          restaurant_id,
          ...comment
        }))
        const length = oldRecords.length > newRecords.length ? newRecords.length : oldRecords.length
        let updateArray = []
        let insertArray = [...newRecords]
        let deleteArray = [...oldRecords]

        for (let i = 0; i < length; i++) {
          const updateData = {
            id: oldRecords[i].id,
            ...newRecords[i]
          }
          updateArray.push(updateData)
          insertArray.splice(0, 1)
          deleteArray.splice(0, 1)
        }
        deleteArray = deleteArray.map((item) => item.id)

        resolve(
          restaurant_comments.bulkCreate(updateArray, {
            updateOnDuplicate: ['author', 'comment_time', 'content', 'star']
          })
            .then(() => restaurant_comments.bulkCreate(insertArray))
            .then(() => restaurant_comments.destroy({
              where: { id: deleteArray }
            }))
        )
      }
    })
  }

  updateOpeningHours (restaurant_id, newRecords, oldRecords) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new Error('no value'))
      } else {
        console.log('oldRecords', oldRecords)
        newRecords = newRecords.map((hour) => ({
          restaurant_id,
          day: hour.close.day,
          startTime: hour.open.time,
          endTime: hour.close.time
        }))
        const length = oldRecords.length > newRecords.length ? newRecords.length : oldRecords.length
        let updateArray = []
        let insertArray = [...newRecords]
        let deleteArray = [...oldRecords]

        for (let i = 0; i < length; i++) {
          const updateData = {
            id: oldRecords[i].id,
            ...newRecords[i]
          }
          updateArray.push(updateData)
          insertArray.splice(0, 1)
          deleteArray.splice(0, 1)
        }
        deleteArray = deleteArray.map((item) => item.id)

        resolve(
          restaurant_openingHours.bulkCreate(updateArray, {
            updateOnDuplicate: ['day', 'startTime', 'endTime']
          })
            .then(() => restaurant_openingHours.bulkCreate(insertArray))
            .then(() => restaurant_openingHours.destroy({
              where: { id: deleteArray }
            }))
        )
      }
    })
  }

  updateBasicExtend (array, restaurant_id, group, url, oldArray) {
    return new Promise((resolve, reject) => {
      if (url) {
        // group = 'photo'
        array = array.map((item) => ({
          restaurant_id,
          group,
          value: baseURL.concat(url, '/', item.photo_reference)
        }))
        const length = oldArray.length > array.length ? array.length : oldArray.length
        let updateArray = []
        let insertArray = [...array]
        let deleteArray = [...oldArray]

        for (let i = 0; i < length; i++) {
          const updateData = {
            id: oldArray[i].id,
            ...array[i]
          }
          updateArray.push(updateData)
          insertArray.splice(0, 1)
          deleteArray.splice(0, 1)
        }
        deleteArray = deleteArray.map((item) => item.id)

        resolve(
          restaurant_basic_extend.bulkCreate(updateArray, { updateOnDuplicate: ['value'] })
            .then(() => restaurant_basic_extend.bulkCreate(insertArray))
            .then(() => restaurant_basic_extend.destroy({
              where: { id: [deleteArray] }
            }))
        )
      } else {
        // group = keyword
        const inputArray = array.map((item) => ({
          restaurant_id,
          group,
          value: item.word,
          count: item.count
        }))
        resolve(restaurant_basic_extend.bulkCreate(inputArray))
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
