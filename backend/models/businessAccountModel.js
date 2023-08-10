// business account 
// id businessCode businessName type email phoneNumber1 phoneNumber2 address city country image owenrId


const mongoose = require('mongoose')
 
const businessAccountSchema = mongoose.Schema(
  {
    businessId: {
      type: String,
      unique: true,
    },
    businessCode: {
        type: String,
        unique: true,
    },
    name: {
      type: String,
      required: [true, 'Please add Name'],
    },
    email: {
      type: String,
      required: [true],
      unique: true,
    },
    phoneNumber1: {
      type: String,
      required: [true],
      unique: true,
    }, 
    phoneNumber2: {
        type: String,
    },
    country: {
        type: String,
        required: [true],
    }, 
    city: {
        type: String,
        required: [true],
    }, 
    address: {
        type: String,
        required: [true],
    },
    owenrId: {
        type: String,
        required: [true],
        unique: true,
    },
    image: {
        type: String,
        required: [true],
    },
    accountType: {
        type: String,
        enum: ['Pro', 'Pro Plus', 'Premium'],
        required: [true],
    },
    startDate:{
        type:Date,
        required: [true],
    },
    upgradeDate:{
        type: Date,
        required: [true],
    },
    endDate:{
        type: Date,
        required: [true],
    },
    automaticPayment:{
        type: Boolean,
        required: [true],
        default: true,
    },
    isLastMonth:{
        type: Boolean,
        required: [true],
        default: false,
    }
  },
)

module.exports = mongoose.model('businessAccount', businessAccountSchema)