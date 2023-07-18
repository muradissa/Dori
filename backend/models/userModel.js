const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    country: {
      type: String,
      required: [true, 'Please add a account type'],
    },
    address: {
      type: String,
      required: [true, 'Please add a account type'],
    },
    accountType: {
      type: String,
      required: [true, 'Please add a account type'],
    },
    birthday: {
      type: String,
      required: [true, 'Please add a birthday'],
    },
    employerCode: {
      type: String,
      // required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
// firstName lastName email password phoneNumber accountType address birthday employerCode


// business account 
// id businessName type email phoneNumber1 phoneNumber2 address city country image owenrId

//employer
// id accountId businessId type code

//Services
// id serviceId businessId name  time

//worktime
// id businessId day opentime closetime breakFrom breakTo

//Vacations
// id businessId type employerId date fromClock toClock

//busniessSettings
