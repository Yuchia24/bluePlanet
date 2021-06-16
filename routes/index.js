const restaurant = require('./restaurant')
const googleApi = require('./googleApi')



module.exports = (app) => {
  app.use('/api/restaurant', restaurant)
  app.use('/api/googleapi', googleApi)
}
