const {Medicine,Disease,User} = require('../models')
const printReceipt = require('../helper/receipt')

class Controller{

    static medicineList(req,res){
        Medicine.medicineList(Disease)
        .then(medicine => res.render('medicineList',{ medicine })) //nampilin medicine sama disease aja
        .catch(err => res.send(err))
    }

    static medicineDetail(req,res){
        const id = req.params.medicineId
        Medicine.findByPk(+id,{
            include:Disease
        })
        .then(medicine => res.render('medicineDetail', { medicine })) // nampilin medicine,stock,price,disease
        .catch(err => res.send(err))
    }

    static buy(req,res){
        const printReceipts = printReceipt()
        res.render('receipt', {printReceipts})
    }

}
module.exports = Controller