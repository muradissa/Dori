const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true],
      unique:true
    },
    businessId: {
        type: String,
        required: [true],
    },
    email: {
      type: String,
      required: [true],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    employeeCode: {
      type: String,
      required: [true],
      unique: true,
    },
    
  },
  
)

module.exports = mongoose.model('Employee', employeeSchema)
// firstName lastName email password phoneNumber accountType address birthday employerCode


// business account 
// id businessCode businessName type email phoneNumber1 phoneNumber2 address city country image owenrId

//employee
// id accountId businessId type code
