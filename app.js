const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const dayjs = require('dayjs')
const time = dayjs().format('{YYYY} MM-DDTHH:mm:ss', { timeZone: 'zh-tw' })

const handleErrors = require('./middleware/handleErrors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

const errorLogStream = fs.createWriteStream(path.join(__dirname, './log', 'error.log'), { flags: 'a' })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use((req, res, next) => {
  const originalSend = res.send
  res.send = function (body) {
    res.__body_response = body
    originalSend.call(this, body)
  }
  next()
})

app.use(morgan((tokens, req, res) => {
  return [
    time,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res),
    'ms',
    '\nrequest: ' + JSON.stringify(req.query),
    '\nresponse: ' + res.__body_response
  ].join(' ')
}, {
  stream: errorLogStream,
  skip: (req, res) => {
    const body = JSON.parse(res.__body_response)
    return !body.errorCode
  }
}))

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

require('./routes')(app)
app.use(handleErrors)
