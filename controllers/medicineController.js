const {Medicine,Disease,User} = require("../models")

class Controller{

    static addMedicine(req,res){
      Medicine.findAll({
        include:[Disease,User]
      })
      .then(medicine => res.render('addMedicine',{ medicine }))
      .catch(err => res.send(err))
    }

    static saveMedicine(req,res){
        const {name,price,stock,DiseaseId,UserId} = req.body
        Medicine.create({
            name:name,
            price:price,
            stock:stock,
            DiseaseId:DiseaseId,
            UserId:UserId
        })
        .then(res.redirect(`/medicine/`))
        .catch(err => res.send(err))
    }

    static update(req,res){
        const id = req.params.medicineId
        let medicine
        let disease
        let user
        Medicine.findByPk(+id)
        .then(result => {
            medicine = result
            return Disease.findAll()
        })
        .then(result => {
            disease = result
            return User.findAll()
        })
        .then(result => {
            user = result
            res.render('edit',{medicine,disease,user})
        })
        .catch(err => res.send(err))
    }

    static saveChanges(req,res){
        const id = req.params.medicineId
        const {name,price,stock,DiseaseId,UserId} = req.body
        Medicine.update({
            name:name,
            price:+price,
            stock:+stock,
            DiseaseId:+DiseaseId,
            UserId:+UserId
        },
        {
            where:{
                id:+id
            }
        })
    }
}
module.exports = Controller