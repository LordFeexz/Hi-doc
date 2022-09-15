const express = require('express')
const Controller = require('../controllers/userController')
const router = express.Router()

router.get('/',Controller.medicineList)

router.get('/:medicineId/detail',Controller.medicineDetail)

router.get('/:id/add-salary',Controller.buy)


module.exports = router