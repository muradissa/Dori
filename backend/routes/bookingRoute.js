const express = require('express')
const bookingRouter = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

bookingRouter.post('/', registerUser)
bookingRouter.post('/login', loginUser)
bookingRouter.get('/me', protect, getMe)
bookingRouter.post('/logout', logoutUser)


module.exports = bookingRouter

// ----------------------------------------------------------------
// ---- user 
// 1) request new booking 
// 2) get today booking 
// 3) get tomorrow booking 
// 4) get all user bookings  
// 5) cancel booking

// ----------------------------------------------------------------
// ---- user 
// 1) request new booking 
// 2) get today booking 
// 3) get tomorrow booking 
// 4) get all user bookings  
// 5) cancel booking

