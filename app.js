const express = require('express')
const app = express()
const PORT = 3000
const db = require('./models')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.listen(PORT, () => {
  db.sequelize.sync()
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)
