const express = require('express')
const bakeryController = require('../controller/bakery.js')
const breadController = require('../controller/bread.js')
const router = express.Router()

bakeryController(router)
breadController(router)

module.exports = router
