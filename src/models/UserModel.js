const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    Email: {
      type: String,
      unique: true,
    },
    FirstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Password: {
      type: String,
    },
    Photo: {
      type: String,
    },
    CreateDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("user", DataSchema);

module.exports = UserModel;
