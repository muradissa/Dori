const express = require('express')
const routerVacation = express.Router()
const {
  getVacations,
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation
} = require('../controllers/vacationController')
const { protect } = require('../middleware/authMiddleware')

routerVacation.get('/getVacations', protect, getVacations)

routerVacation.get('/getAllVacations', protect, getAllVacations)
routerVacation.post('/addVacation',protect ,addVacation)
routerVacation.post('/updateVacation',protect ,updateVacation)
routerVacation.post('/deleteVacation', protect, deleteVacation)



module.exports = routerVacation




/***** requests by busniess code --- employee---******/ 
// 1) Get all Vacation --- by ( business code ,employee Id) --- authorization (user,employee) ---- return [ id , employes [] ,  from ,  to]

/***** requests by business id ---busniess Account---******/ 
// 1) Get all Vacation --- by ( business id ) --- authorization (owner) ---- return [id , employes [] ,  from ,  to  ]
// 2) add Vacation --- by ( business id ,  ,user Id) --- authorization (owner) 
// 3) update Vacation --- by (  business id ,  Vacation id ,user Id ) --- authorization (owner)
// 4) delete Vacation --- by (  business id ,  Vacation id ,user Id) --- authorization (owner) 



