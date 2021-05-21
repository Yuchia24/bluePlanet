const apiHelper = require('../../utils/helper')
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
      
    } catch (error) {
      console.log(error)
    }
  },
  getVenderPurpose: async (req, res) => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  },
  getPurpose: async (req, res) => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  },
  getVenderType: async (req, res) => {
    try {
      
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
