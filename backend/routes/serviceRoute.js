const express = require('express')
const routerService = express.Router()
const {
  getAllServices,
  getAllServicesBusiness,
  addService,
  updateService,
  deleteService
} = require('../controllers/serviceController')
const { protect } = require('../middleware/authMiddleware')

routerService.get('/getServices', protect, getAllServices)
routerService.get('/getAllServices', protect, getAllServicesBusiness)
routerService.post('/addService',protect ,addService)
routerService.post('/updateService',protect ,updateService)
routerService.post('/deleteService', protect, deleteService)



module.exports = routerService




/***** requests by busniess code ---user and employee---******/ 
// 1) Get all service --- by ( business code ) --- authorization (user,employee) ---- return [ id ,  name ,  time ,  price !!]

/***** requests by business id ---busniess Account---******/ 
// 1) Get all service --- by ( business id ) --- authorization (owner) ---- return [ id ,  name ,  time ,  price , showprice , availability]
// 2) add service --- by ( business id ,  ,userId) --- authorization (owner) 
// 3) update service --- by (  business id ,  service id ) --- authorization (owner)
// 4) delete sercice --- by (  business id ,  service id ) --- authorization (owner) 



