const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
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
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
// firstName lastName phoneNumber accountType address birthday


// busniess account 
// id busniessName type email phoneNumber1 phoneNumber2 address city country image owenrId

//employer
// id accountId busniessId type code

//Services
// id serviceId busniessId name  time

//worktime
// id busniessId day opentime closetime breakFrom breakTo

//Vacations
// id busniessId type employerId date fromClock toClock

//busniessSettings
