const {Medicine,Disease,User} = require("../models")

class Controller{

    static allMeds(req, res) {
        Medicine.medicineList(Disease)
        .then(medicine => res.render('meds-stock',{ medicine })) //nampilin medicine sama disease aja
        .catch(err => res.send(err))
    }

    static addMedicine(req,res){
      Medicine.findAll({
        include:[Disease,User]
      })
      .then(medicine => res.render('add-medicine',{ medicine }))
      .catch(err => res.send(err))
    }

    static saveMedicine(req,res){
        const {name,price,stock,DiseaseId,UserId} = req.body
        Medicine.create({
            name:name,
            price:+price,
            stock:+stock,
            DiseaseId:+DiseaseId,
            UserId:+UserId
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
            return User.findOne({
                where: {
                    id: medicine.UserId
                }
            })
        })
        .then(result => {
            user = result
            res.render('edit',{medicine,disease,user})
            // res.send(user)
        })
        .catch(err => res.send(err))
    }

    static saveChanges(req,res){
        const id = req.params.medicineId
        const {name,price,stock,DiseaseId,UserId} = req.body
        console.log(req.body);
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
        .then(() => res.redirect('/medicine'))
        .catch(err => res.send(err))
    }

    static destroy(req, res) {
        const idReq = req.params.id
        Medicine.destroy({
            where: {
                id: +idReq
            }
        })
            .then(res.redirect('/medicine'))
            .catch((err) => {
                res.send(err)
            })
    }
}
module.exports = Controller