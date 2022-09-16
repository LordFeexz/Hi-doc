const {User, UserProfile} = require('../models')

const bcryptjs = require('bcryptjs')

class Controller{

    static login(req,res){
        const { error } = req.query
        res.render('login',{ error })
    }

    static postLogin(req,res){
        const {username,password} = req.body
        User.findOne({
            where:{username}
        })
        .then(user => {
            if(user){
                const valid = bcryptjs.compareSync(password,user.password)
                if(valid){
                    req.session.userid = user.id
                    req.session.role = user.role
                    console.log('masuk');
                    req.session.userName = user.userName
                    res.redirect('/home')
                }
                else{
                    const error = `username or password is invalid`
                    res.redirect(`/login?error=${error}`)
                }
            }
            else{
                const error = `username or password is invalid`
                res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => {
            console.log('error');
            res.send(err)
        }) 

    }

    static landingPage(req, res) {
        res.render('home')
    }

    static registerForm(req, res) {
        const {error} = req.query
        User.findAll()
            .then(() => {
                res.render('register',{error})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static saveData(req, res) {
        const {fullName, username,password,email,role, age, address, phone} = req.body
        User.create({
           username: username,
           password:password,
           email:email,
           role:role
        })
        .then(createduser => {
            return UserProfile.create({
                fullName:fullName,
                age: age,
                address: address,
                phone: phone,
                UserId: createduser.id,
                email: email
            })
        })
        .then(() => res.redirect('/'))
        .catch(err => {
            if(err.name === `SequelizeValidationError` || err.name === `SequelizeUniqueConstraintError`){
                const error = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?error=${error}`)
            }
            else{
                res.send(err)
            }
        })
    }
}
module.exports = Controller