const mongoose = require('mongoose')

const wotkTimeSchema = mongoose.Schema(
  {
    businessId: {
      type: String,
      required: [true, 'Please add a business Id'],
    },
    name: {
      type: String,
      required: [true, 'Please add service Name'],
    },
    time: {
      type: String,
      required: [true, 'Please add service time'],
    },
    price: {
      type: number,
      required: [true, 'Please add service price'],
      default: 0,
    }, 
    showPrice: {
        type: Boolean,
        required: [true],
        default: false,
    },
    available: {
        type: Boolean,
        required: [true],
        default: true,
    },
  },
)

module.exports = mongoose.model('WotkTime', wotkTimeSchema)