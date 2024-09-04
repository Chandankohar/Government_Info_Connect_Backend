const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "admin",
    required: true,
  },

  municipality: {
    type: String,
    required: true,
  },

  schemename: {
    type: String,
    required: true,
  },

  schemetype: {
    type: String,
    required: true,
  },
 
  photos: [{ 
    type: String,
    required:true }],

  description: {
    type: String,
    required:true,
  },

  beneficialgroup: {
    type: String,
    required:true,
  },

  validatedate: {
    type: Date,
    required:true,
  },

  documentrequired: {
    type: String,
    required:true,
  },

  maxapplicant: {
    type: Number,
    required:true,
  },
  date: {
    type: Date,
    required:true,
    default:Date.now()
  },

});

const Scheme = mongoose.model("Scheme", schemeSchema);

module.exports = Scheme;
