const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new mongoose.Schema({
  name: { type: String },
  credits: { type: Number },
  teacher: {
    type: mongoose.ObjectId,
    ref: 'Teacher'
  }
});

module.exports = mongoose.model('Course', courseSchema);