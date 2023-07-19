const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//// firstName lastName email password phoneNumber accountType address birthday employerCode
// accountType : user  , employer , owner

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  const { firstName ,lastName, email, password ,confirmPassword,phoneNumber , country,address ,birthday } = req.body ;
  if (!firstName  || !lastName  || !email || !password || !confirmPassword || !phoneNumber  || !country || !address || !birthday ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user email exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Check if user phone number exists
  const userExists2 = await User.findOne({ phoneNumber })
  if (userExists2) {
    res.status(400)
    throw new Error('User phone number already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // generate Employer Code
  const generateCode = generateEmployerCode();
  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    accountType : "user",
    country,
    address,
    birthday,
    employerCode: generateCode,
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Check for user email
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// Generate Employer Code
const generateEmployerCode = () => {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var code = '';

  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
}
