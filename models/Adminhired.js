const mongoose = require("mongoose");



const adminhiredSchema = new mongoose.Schema({
 
  joiningid: {
    type: String,
    unique: true,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  
 
  password: {
    type: String,
    required: true,
  },
 
});


const Adminhired = mongoose.model("Adminhired", adminhiredSchema);

module.exports = Adminhired;
