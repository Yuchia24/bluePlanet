const {
  vender_enum,
  vender_items,
  vender_rawData,
  restaurant_basic_extend,
  restaurant_basic,
  restaurant_comments,
  restaurant_openingHours,
  google_details,
  google_reviews,
  google_photos
} = require('../models')

const { BadRequest, BluePlanetError } = require('../utils/errors')

const vender_id = 1
const api_endPoint = 'http://demo.blueplanet.com.tw:11693'

module.exports = class VenderRepository {
  getVenderItemRecords (restaurant_id, kind) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !kind) {
        reject(new BadRequest('Required parameters does not exist.'))
      } else {
        resolve(vender_items.findAll({
          raw: true,
          where: {
            restaurant_id,
            kind
          }
        }))
      }
    })
  }

  getBasicExtendRecords (restaurant_id, group) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id || !group) {
        reject(new BadRequest('Required parameters does not exist.'))
      } else {
        resolve(restaurant_basic_extend.findAll({
          raw: true,
          where: {
            restaurant_id,
            group
          }
        }))
      }
    })
  }

  getBasicRecords (restaurant_id) {
    return new Promise((resolve, reject) => {
      if (!restaurant_id) {
        reject(new BadRequest('Required parameters does not exist.'))
      } else {
        const result = {}
        resolve(
          restaurant_basic.findOne({ raw: true, where: { restaurant_id } })
            .then((basic) => {
              result.basic = basic
              return restaurant_comments.findAll({ raw: true, where: { restaurant_id } })
            })
            .then((comments) => {
              result.comments = comments
              return restaurant_openingHours.findAll({ raw: true, where: { restaurant_id } })
            })
            .then((opening_hours) => {
              result.opening_hours = opening_hours
              return restaurant_basic_extend.findAll({ raw: true, where: { restaurant_id, group: 'photo' } })
            })
            .then((photos) => {
              result.photos = photos
              return result
            })
        )
      }
    })
  }

  insertRawData (restaurant_id, posted_data, response_data, api_url, status) {
    return new Promise((resolve, reject) => {
      if (!response_data) {
        reject(new BluePlanetError('Blue Planet return no value'))
      } else {
        resolve(vender_rawData.create({
          vender_id,
          restaurant_id,
          posted_data: JSON.stringify({ data: posted_data }),
          response_data: JSON.stringify(response_data),
          api_url,
          api_endPoint,
          status
        }))
      }
    })
  }

  updateBasic (restaurant_id, data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        reject(new BluePlanetError('Blue Planet return no value'))
      } else {
        resolve(restaurant_basic.create({
          restaurant_id,
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
        }, {
          updateOnDuplicate: ['address', 'country', 'formatted_phone_number', 'name', 'price_level', 'rating', 'user_ratings_total', 'route', 'locationLat', 'locationLng', 'website', 'updatedAt']
        }))
      }
    })
  }

  updateComments (restaurant_id, newRecords, oldRecords) {
    return new Promise((resolve, reject) => {
      if (!newRecords.length) {
        reject(new BluePlanetError('Blue Planet return no value'))
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
        if (deleteArray.length) {
          deleteArray = deleteArray.map((item) => item.id)
        }
        const newArray = updateArray.concat(insertArray)

        resolve(
          restaurant_comments.bulkCreate(newArray, {
            updateOnDuplicate: ['author', 'comment_time', 'content', 'star', 'updatedAt']
          })
            .then(() => restaurant_comments.destroy({
              where: { id: deleteArray }
            }))
        )
      }
    })
  }

  updateOpeningHours (restaurant_id, newRecords, oldRecords) {
    return new Promise((resolve, reject) => {
      if (!newRecords.length) {
        reject(new BluePlanetError('Blue Planet return no value'))
      } else {
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
        if (deleteArray.length) {
          deleteArray = deleteArray.map((item) => item.id)
        }
        const newArray = updateArray.concat(insertArray)

        resolve(
          restaurant_openingHours.bulkCreate(newArray, {
            updateOnDuplicate: ['day', 'startTime', 'endTime', 'updatedAt']
          })
            .then(() => restaurant_openingHours.destroy({
              where: { id: deleteArray }
            }))
        )
      }
    })
  }

  updateBasicExtend (restaurant_id, newRecords, oldRecords, group, url) {
    return new Promise((resolve, reject) => {
      if (!newRecords.length) {
        reject(new BluePlanetError('Blue Planet return no value'))
      } else {
        newRecords = newRecords.map((item) => ({
          restaurant_id,
          group,
          value: group === 'photo' ? api_endPoint.concat(url, '/', item.photo_reference) : item.word,
          count: group === 'photo' ? '' : item.count
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
        if (deleteArray.length) {
          deleteArray = deleteArray.map((item) => item.id)
        }
        const newArray = updateArray.concat(insertArray)

        resolve(
          restaurant_basic_extend.bulkCreate(newArray, { updateOnDuplicate: ['value', 'count', 'updatedAt'] })
            .then(() => restaurant_basic_extend.destroy({
              where: { id: deleteArray }
            }))
        )
      }
    })
  }

  updateVenderItems (restaurant_id, newRecords, oldRecords, kind, restaurant_name) {
    return new Promise((resolve, reject) => {
      if (!newRecords.length) {
        reject(new BluePlanetError('Blue Planet return no value'))
      } else {
        newRecords = newRecords.map((item) => ({
          vender_id,
          restaurant_id,
          restaurant_name,
          kind,
          keyId: item.keyId,
          count: item.count
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
        if (deleteArray.length) {
          deleteArray = deleteArray.map((item) => item.id)
        }
        const newArray = updateArray.concat(insertArray)

        resolve(
          vender_items.bulkCreate(newArray, { updateOnDuplicate: ['keyId', 'count', 'updatedAt'] })
            .then(() => vender_items.destroy({
              where: { id: deleteArray }
            }))
        )
      }
    })
  }

  getGoogleDetails (place_id) {
    return new Promise((resolve, reject) => {
      resolve(google_details.findAll({
        raw: true,
        attributes: ['place_id'],
        where: {
          place_id: place_id
        }
      }))
    })
  }

  insertGoogleDetails (response) {
    return new Promise((resolve, reject) => {
      resolve(google_details.create(
        response
      ))
    })
  }

  updateGoogleDetails (response) {
    return new Promise((resolve, reject) => {
      if (!response.place_id) {
        reject(new Error('no value'))
      } else {
        resolve(google_details.update(response, { where: { place_id: response.place_id } }))
      }
    })
  }

  getGoogleReviews (place_id, author_name, review_date) {
    return new Promise((resolve, reject) => {
      resolve(google_reviews.findAll({
        raw: true,
        attributes: ['place_id', 'author_name', 'review_date'],
        where: {
          place_id: place_id,
          author_name: author_name,
          review_date: review_date
        }
      }))
    })
  }

  insertGoogleReviews (response) {
    return new Promise((resolve, reject) => {
      resolve(google_reviews.create(
        response
      ))
    })
  }

  updateGoogleReviews (response) {
    return new Promise((resolve, reject) => {
      if (!response.place_id) {
        reject(new Error('no value'))
      } else {
        resolve(google_reviews.update(response,
          {
            where: {
              place_id: response.place_id,
              author_name: response.author_name,
              review_date: response.review_date
            }
          }))
      }
    })
  }

  getGooglePhotos (photo_reference) {
    return new Promise((resolve, reject) => {
      resolve(google_photos.findAll({
        raw: true,
        attributes: ['photo_reference'],
        where: {
          photo_reference: photo_reference,
        }
      }))
    })
  }

  insertGooglePhotos (response) {
    return new Promise((resolve, reject) => {
      resolve(google_photos.create(
        response
      ))
    })
  }

  updateGooglePhotos (response) {
    return new Promise((resolve, reject) => {
      if (!response.photo_reference) {
        reject(new Error('no value'))
      } else {
        resolve(google_reviews.update(response,
          {
            where: {
              photo_reference: response.photo_reference
            }
          }))
      }
    })
  }

}
