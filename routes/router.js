const express = require('express')
const Controller = require('../controllers/indexController')
const router = express.Router()
const medicine = require('./medicineRouter')
const user = require('./userRouter')

router.get('/',Controller.login)

router.post('/',Controller.postLogin)

router.get('/register', Controller.registerForm)

router.post('/register', Controller.saveData)

router.use((req,res,next) => {
    if(!req.session.user.id){
        const error = `login first!`
        res.redirect(`/?error=${error}`)
    }
    else{
        next()
    }
})

router.get('/home', Controller.landingPage)

router.use('/medicine',medicine)

router.use('/user',user)

module.exports = router