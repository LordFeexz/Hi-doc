const express = require('express');
const app = express()
const port = 3000
const router = require('./routes/router')
const session = require('express-session')

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use(session({
    secret:'qwertyui',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:true,
        sameSite:true
    }
}))

app.use(router)

app.listen(port,() => {
    console.log(`listening on port ${port}`)
})