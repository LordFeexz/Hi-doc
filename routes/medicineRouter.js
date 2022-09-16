const express = require('express')
const Controller = require('../controllers/medicineController')
const router = express.Router()

router.use((req,res,next) => {
    if(req.session.role !== 'doctor'){
        const {error} = 'you cant access here'
        res.redirect(`/medicine/?error=${error}`)
    }
    else{
        next()
    }
})

router.get('/', Controller.allMeds)

router.get('/add',Controller.addMedicine)

router.post('/add',Controller.saveMedicine)

router.get('/:medicineId/edit',Controller.update)

router.post('/:medicineId/edit',Controller.saveChanges)

router.get('/:id/delete', Controller.destroy)




module.exports = router