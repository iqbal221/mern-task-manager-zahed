const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    Title: {
      type: String,
    },
    Description: {
      type: String,
    },
    Status: {
      type: String,
    },
    Email: {
      type: String,
    },
    CreateDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const TaskModel = mongoose.model("task", DataSchema);

module.exports = TaskModel;
