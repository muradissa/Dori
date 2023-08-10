
//worktime
// id businessId day opentime closetime breakFrom breakTo

const mongoose = require('mongoose')

const vacationSchema = mongoose.Schema(
  {
    businessId: {
      type: String,
      required: [true, 'Please add a business Id'],
    },
    day: {
      type: String,
      required: [true, 'Please add the day'],
    },
    openTime: {
      type: String,
      required: [true, 'Please add open time'],
    },
    closeTime: {
      type: String,
      required: [true, 'Please add a close time'],
    },
    breakFrom: {
      type: String,
      required: [true],
    },
    breakTo: {
      type: String,
      required: [true],
    },
    isClosed: {
        type: Boolean,
        required: [true],
        default: false,
    },
    noBreak: {
        type: Boolean,
        required: [true],
        default: false,
    },
  },
)

module.exports = mongoose.model('Vacation', vacationSchema)