if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const AWS = require('aws-sdk')
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey
const morgan = require('morgan')

console.log('accessKeyId', accessKeyId)
console.log('secretAccessKey', secretAccessKey)

const handleNotification = (app) => {
  AWS.config.update({
    // accessKeyId,
    // secretAccessKey,
    region: 'ap-northeast-1'
  })

  // 攔截 req, res 資訊
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
    // 資訊存入 params
    console.log('token', tokens.status(req, res))
    const response = {
      method: tokens.status(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      request: req.query,
      response_message: JSON.parse(res.__body_response).message
      // response_message: res.__body_response.message ? res.__body_response.message : ''
    }

    if (response.status >= 400) {
      const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
      const params = {
        // Message: 'Hello Alice',
        Message: JSON.stringify(response),
        TopicArn: 'arn:aws:sns:ap-northeast-1:234232853477:HotGirlNotification'
      }

      // publishTextPromise.publish
      publishTextPromise.publish(params)
        .promise()
        .then((data) => {
          console.log('publish text')
          console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`)
          console.log('MessageID is ' + data.MessageId)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }))
}

module.exports = handleNotification
