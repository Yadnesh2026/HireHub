const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //recruiter contains a MongoDB ObjectId that refers to a document in the User model."
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
