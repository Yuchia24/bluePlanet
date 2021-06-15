const restaurant = require('./restaurant')

module.exports = (app) => {
  app.use('/api/restaurant', restaurant)
}
