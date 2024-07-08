const express = require('express')
const userCtrl = require('./controllers/user')

const router = express.Router()

router
  .post('/login', userCtrl.login)
  .post('/hello', userCtrl.hello)
  .post('/world', userCtrl.world)

module.exports = router
