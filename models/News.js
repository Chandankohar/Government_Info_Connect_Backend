const mongoose = require("mongoose");

const newsScheme = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "admin",
    required: true,
  },

  municipality: {
    type: String,
    required: true,
  },

  newstitle: {
    type: String,
    required: true,
  },

  newsdescription: {
    type: String,
    required: true,
  },
 
  
  date: {
    type: Date,
    required:true,
    default:Date.now()
  },
});

const News = mongoose.model("News", newsScheme);

module.exports = News;
