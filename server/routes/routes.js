const express = require('express')
const bakeryController = require('../controller/bakery.js')
const router = express.Router()

bakeryController(router)

module.exports = router
