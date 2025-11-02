const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
