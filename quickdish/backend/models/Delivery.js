const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['assigned', 'picked_up', 'on_the_way', 'delivered'],
    default: 'assigned'
  },
  currentLocation: {
    lat: Number,
    lng: Number
  },
  estimatedArrival: Date,
  actualArrival: Date,
  notes: String
});

module.exports = mongoose.model('Delivery', deliverySchema);