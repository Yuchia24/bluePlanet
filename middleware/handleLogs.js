const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const dayjs = require('dayjs')
const time = dayjs().format('{YYYY} MM-DDTHH:mm:ss', { timeZone: 'zh-tw' })

const errorLogStream = fs.createWriteStream(path.join(__dirname, '../log', 'error.log'), { flags: 'a' })

const handleLogs = (app) => {
  app.use((req, res, next) => {
    console.log('handle log')
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
      return res.statusCode < 400
      // const body = JSON.parse(res.__body_response)
      // return !body.errorCode
    }
  }))
}

module.exports = handleLogs
