const apiHelper = require('../../utils/helper')
const { data1, vender, vender_restaurant_keyword_rawData, vender_input_data } = require('../../models')
const token = process.env.token
const qs = require('qs')

const restaurantController = {
  getVenderKeyword: async (req, res) => {
    try {
      const { kw } = req.body
      const response = await apiHelper.post('/all_kw',
        qs.stringify({
          token,
          kw
        })
      )
      console.log('response', response.data.result)
    } catch (error) {
      console.log(error)
    }
  },
  getKeyword: async (req, res) => {
    try {
      // ./keywords?kw={kw}
      const { kw } = req.query
      const response = await apiHelper.post('/all_kw',
        qs.stringify({
          token,
          kw
        })
      )
      if (response.data.success) {
        return res.status(400).json({
          error: response.data.error
        })
      }
      return res.status(200).json({
        result: response.data.result
      })
    } catch (error) {
      console.log(error)
    }
  },
  getVenderPurpose: async (req, res) => {
    try {
      const { kw } = req.body
      const response = await apiHelper.post('/purpose',
        qs.stringify({
          token,
          kw
        })
      )
      console.log('response', response.data.result)
    } catch (error) {
      console.log(error)
    }
  },
  getPurpose: async (req, res) => {
    try {
      // ./purpose?restaurant_name={restaurantName}&restaurant_id={restaurantId}
      console.log('query', req.query)
    } catch (error) {
      console.log(error)
    }
  },
  getVenderType: async (req, res) => {
    try {
      const { kw } = req.body
      const response = await apiHelper.post('/type',
        qs.stringify({
          token,
          kw
        })
      )
      console.log('response', response.data.result)
    } catch (error) {
      console.log(error)
    }
  },
  getType: async (req, res) => {
    try {

    } catch (error) {
      console.log(error)
    }
  },
  getVenderDish: async (req, res) => {
    try {
      const { kw } = req.body
      const response = await apiHelper.post('/dish',
        qs.stringify({
          token,
          kw
        })
      )
      console.log('response', response.data.result)
    } catch (error) {
      console.log(error)
    }
  },
  getDish: async (req, res) => {
    try {

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = restaurantController
