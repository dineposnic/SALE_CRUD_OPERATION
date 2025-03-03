const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  description: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Sale', saleSchema);