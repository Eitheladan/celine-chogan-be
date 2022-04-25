const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    _id: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
  })
);

module.exports = Role;