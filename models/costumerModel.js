const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
    default: "user-default.jpg",
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const customers = mongoose.model("customers", customersSchema);

module.exports = customers;
