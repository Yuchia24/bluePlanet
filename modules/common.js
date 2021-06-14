const { vender_enum, vender_item } = require('../models')

const getOriginalRecords = (restaurant_id, kind) => {
  return new Promise((resolve, reject) => {
    if (!restaurant_id || !kind) {
      reject(new Error('no value'))
    } else {
      resolve(vender_item.findAll({
        raw: true,
        where: {
          restaurant_id, kind
        }
      }))
    }
  })
}



module.exports = { getOriginalRecords }
