const express = require('express')
const Controller = require('../controllers/indexController')
const router = express.Router()
const medicine = require('./medicineRouter')
const user = require('./userRouter')

router.get('/',Controller.login)

router.post('/',Controller.postLogin)

router.get('/register', Controller.registerForm)

router.post('/register', Controller.saveData)

router.get('/home', Controller.landingPage)

router.use('/medicine',medicine)

router.use('/user',user)

module.exports = router