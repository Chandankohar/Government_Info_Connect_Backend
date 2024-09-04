const mongoose = require("mongoose");

const AppliedSchemeSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  scheme: {
    type: mongoose.Schema.ObjectId,
    ref: "Scheme",
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
  document: [{
    type: String,
    required: true,
  }],
  username: {
    type: String,
    required: true,
  },
  usercitizenid: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default:'null',
  },
  rejectreason: {
    type: String,
    required: true,
    default:'null',
  },
  date: {
    type: Date,
    required: true,
    default:Date.now()
  },
});

const AppliedScheme = mongoose.model("AppliedScheme", AppliedSchemeSchema);

module.exports = AppliedScheme;
