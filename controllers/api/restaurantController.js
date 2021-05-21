const restaurantController = {
  getKeywords: async (req, res) => {
    try {
      res.send('hello')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = restaurantController
