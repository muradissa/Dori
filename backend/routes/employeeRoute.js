const express = require('express')
const routerEmployee = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

routerEmployee.get('/getInfo', protect, getInfo)
routerEmployee.post('/ctreateAccount',protect ,ctreateAccount)
routerEmployee.post('/updateInfo',protect ,loginUser)
routerEmployee.get('/me', protect, getMe)
routerEmployee.post('/logout',protect ,logoutUser)


module.exports = routerEmployee




/***** requests by employee code ---user---******/ 
// this request get all the free employee for specific booking date 
// 1) Get all free employees --- by ( business code ,  booking date ) --- authorization (user) ---- return [employeeCode , name , avatar , status free or not]
// 2) upgrade account type --- by ( userId , payment data ) --- authorization (user) ----

/***** requests by employee id ---employee---******/ 
// 1) Get my employee Info --- by ( user Id , employee id) 
// 2) update  employee Info--- by ( user Id , employee id , data)
// 3) response to buiness request --- by ( user Id , employee id , business code ,status)


/***** requests by business id ---busniessAccount---******/ 
// 1) Get all employees --- by ( business id ,userId) --- authorization (busniessAccount) ---- return [employee]
// 2) Get all adds requests --- by ( business id ,  ,userId) --- authorization (busniessAccount)
// 3) update employee status --- by (  business id ,  employee code ,status) --- authorization (busniessAccount)
// 4) request to add new employee --- by (  business id ,  employee code ,status) --- authorization (busniessAccount)



