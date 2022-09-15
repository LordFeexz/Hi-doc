const {User, UserProfile} = require('../models')

class Controller{

    static login(req,res){
        res.render('login')
    }

    static postLogin(req,res){
        
    }

    static landingPage(req, res) {
        res.render('home')
    }

    static registerForm(req, res) {
        User.findAll()
            .then(() => {
                res.render('register')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static saveData(req, res) {

    }
}
module.exports = Controller