const express = require('express')
const routerWorkTime = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

routerWorkTime.get('/getWorkTimes', protect, getWorkTimes)

routerWorkTime.get('/getAllWorkTimes', protect, getAllWorkTimes)
routerWorkTime.post('/updateWorkTime',protect ,updateWorkTime)



module.exports = routerWorkTime




/***** requests by busniess code --- user , employee ---******/ 
// 1) Get Business WorkTime --- by ( business code ,employee Id) --- authorization (user,employee) ---- return [ business code , day , openTime , closeTime , breakFrom ,  breakTo]

/***** requests by business id ---busniess Account---******/ 
// 1) Get Business WorkTime --- by ( business id ) --- authorization (owner) ---- return [id , business code , day , openTime , closeTime , breakFrom ,  breakTo ,isClosed , no beak]
// 2) update WorkTime --- by (  business id ,  WorkTime id ,user Id ) --- authorization (owner)



