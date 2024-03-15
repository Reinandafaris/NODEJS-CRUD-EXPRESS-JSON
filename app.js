const express = require("express");
const morgan = require("morgan");

const costumerRouter = require("./routes/costumerRoutes");

const app = express();

// middleware untuk membaca json dari request body ke kita
app.use(express.json());

// middleware third party
app.use(morgan("dev"));

// middleware kita sendiri
app.use((req, res, next) => {
  console.log("ini middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/costumers", costumerRouter);

module.exports = app;
