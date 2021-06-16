const axios = require('axios')




module.exports = class GoogleService {
  async getVenderData (url, kw) {
    try {
      const res = await axios.get(url, { params: { place_id: kw } })
      return { response: res.data, status: res.status }
    } catch (err) {
      // 紀錄 log
      console.log(err)
      // throw new BluePlanetError(errorCodes.exception_5.errorCode, err.response.data.error)
    }
  }
}
