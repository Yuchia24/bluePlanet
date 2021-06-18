const apiHelper = require('../utils/helper')
const token = process.env.token
const qs = require('qs')

module.exports = class VenderService {
  async getVenderData (url, kw) {
    try {
      const res = await apiHelper.post(url, qs.stringify({ token, kw }))
      return { response: res.data, status: res.status }
    } catch (err) {
      return { response: err.response.data, status: err.response.status }
    }
  }

  // async getPhotoUrl (url, photos) {
  //   try {
  //     photos.map(async (photo) => {
  //       try {
  //         const results = await apiHelper.get(url, { params: photo.photo_reference })
  //         console.log(results)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
