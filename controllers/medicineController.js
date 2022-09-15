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
        Medicine.findByPk(+id)
        .then()
    }

    static saveChanges(req,res){

    }
}
module.exports = Controller