const express = require('express')
const router = express.Router()
const { carEnter, carOut, carList, carReport } = require('../controllers/cars')

router.post('/car-enter', carEnter)
router.get('/car-out', carOut)
router.get('/list-car', carList)
router.get('/report-car', carReport)

module.exports = router
