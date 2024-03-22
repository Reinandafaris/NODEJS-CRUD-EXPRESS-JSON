const fs = require("fs");
const uuid = require("uuid");
const uniqueId = uuid.v4();
const customer = require("../models/costumerModel");

const getAllData = async (req, res, next) => {
  try {
    const customers = await customer.find();

    res.status(200).json({
      status: "success",
      toltalData: customers.length,
      requestTime: req.requestTime,
      data: {
        customers,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getDataById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const costumer = await customer.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        costumer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const createData = async (req, res, next) => {
  try {
    const newCostumer = await customer.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        costumer: newCostumer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const patchData = async (req, res, next) => {
  try {
    const id = req.params.id;

    await customer.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      status: "success",
      data: {
        costumer: req.body,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const putData = async (req, res, next) => {
  try {
    const id = req.params.id;

    const costumer = await customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        costumer,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const costumer = await customer.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      data: null,
      massage: "data has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getAllData,
  getDataById,
  createData,
  patchData,
  putData,
  deleteData,
};
