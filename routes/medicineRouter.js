const express = require('express')
const Controller = require('../controllers/medicineController')
const router = express.Router()

router.get('/',Controller.hiringList)

router.get('/add',Controller.addMedicine)

router.post('/add',Controller.saveMedicine)

router.get('/:medicineId/detail',Controller.medicineDetail)

router.get('/:medicineId/edit',Controller.update)

router.post('/:medicineId/edit',Controller.saveChanges)




module.exports = router