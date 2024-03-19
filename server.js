require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT;
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

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

const customersTest = new customers({
  name: "test",
  email: "rozak@gmail.com",
  phoneNumber: 123,
});

customersTest
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(`Error : ${err}`);
  });

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
