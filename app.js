const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const handleErrors = require('./middleware/handleErrors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

// log setting
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs', 'access.log'), { flags: 'a' })
const errorLogStream = fs.createWriteStream(path.join(__dirname, './logs', 'error.log'), { flags: 'a' })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('combined', { stream: accessLogStream, immediate: false }))
app.use(morgan('combined', {
  stream: errorLogStream,
  immediate: false,
  skip: (req, res) => {
    return res.statusCode < 400
  }
}))

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)
app.use(handleErrors)
