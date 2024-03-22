const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia",
  },
});

const customers = mongoose.model("customers", customersSchema);

module.exports = customers;
