const express = require('express')
const app = express()
const cors = require('cors')

const handleErrors = require('./middleware/handleErrors')
const handleLogs = require('./middleware/handleLogs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
handleLogs(app)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)
app.use(handleErrors)
