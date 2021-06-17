const apiHelper = require('../utils/helper')
const token = process.env.token
const qs = require('qs')

module.exports = class VenderService {
  async getVenderData (url, kw) {
    try {
      const res = await apiHelper.post(url, qs.stringify({ token, kw }))
      return { response: res.data, status: res.status }
    } catch (err) {
      // 紀錄 log
      console.log(err)
      // throw new BluePlanetError(errorCodes.exception_5.errorCode, err.response.data.error)
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
