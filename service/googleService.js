const axios = require('axios')

module.exports = class GoogleService {
  async getVenderData (url, kw) {
    try {
      const res = await axios.get(url, { params: { place_id: kw } })
      return { response: res.data, status: res.status }
    } catch (err) {
      console.log(err)
    }
  }
}
