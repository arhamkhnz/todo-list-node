const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  description: { type: String, required: true },
}, { timestamps: true }
);

module.exports = mongoose.model('ToDo', TodoSchema);