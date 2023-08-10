const mongoose = require('mongoose')

const wotkTimeSchema = mongoose.Schema(
  {
    userId: {
        type: String,
        required: [true],
    },
    businessId: {
      type: String,
      required: [true],
    },
    employeeId: {
      type: String,
      required: [true],
    },
    serviceId: {
      type: String,
      required: [true],
    },
    date: {
      type: date,
      required: [true],
      default: 0,
    }, 
    time: {
        type: string,
        required: [true],
    },
    status: {
        type: string,
        required: [true],
    },
    requestDate: {
        type: date,
        required: [true],
    },
    responseDate: {
        type: date,
        required: [true],
    },
    responseBy: {
        type: string,
        required: [true],
    },
  },
)

module.exports = mongoose.model('Booking', wotkTimeSchema)