require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const customer = require("../models/costumerModel");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

const customers = JSON.parse(
  fs.readFileSync("./data/customer.json", "utf-8")
);

const importData = async () => {
  try {
    await customer.create(customers);
    console.log("data sukses di import");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const clearData = async () => {
  try {
    await customer.deleteMany();
    console.log("data sukses di hapus");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  clearData();
}
