const express = require('express')
const Controller = require('../controllers/indexController')
const router = express.Router()
const medicine = require('./medicineRouter')
const user = require('./userRouter')

router.get('/',Controller.index)

router.use('/jobs',medicine)

router.use('/hiring',user)

module.exports = router