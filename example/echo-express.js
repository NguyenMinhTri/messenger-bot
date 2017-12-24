'use strict'
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const Bot = require('../')

let bot = new Bot({
  token: 'EAACn86pGAioBAKK62KG7Mvs7fBdZA80YZBZCR4T18w3b3CaB1dCcMlR6Btnc0TBJnck3mNRWUnJfarrKM5RxA2F8pLMV2VoiF2oRSd6smbvQvjrWn32Bqc4l9m6Htb79sqEslxNFxXyXFiyWQSPKHziWXKI860vXhkxDDcc6lUf3CdAD7QO',
  verify: 'EAACn86pGAioBAKK62KG7Mvs7fBdZA80YZBZCR4T18w3b3CaB1dCcMlR6Btnc0TBJnck3mNRWUnJfarrKM5RxA2F8pLMV2VoiF2oRSd6smbvQvjrWn32Bqc4l9m6Htb79sqEslxNFxXyXFiyWQSPKHziWXKI860vXhkxDDcc6lUf3CdAD7QO',
  app_secret: 'e4bb9e8c052fd8008d6d3b3d1ac7c9b9'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw JSON.stringify(err)

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  return bot._verify(req, res)
})

app.post('/', (req, res) => {
  bot._handleMessage(req.body)
  res.end(JSON.stringify({status: 'ok'}))
})

http.createServer(app).listen(3000)
