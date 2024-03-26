const fs = require("fs");
const uuid = require("uuid");
const uniqueId = uuid.v4();
const customer = require("../models/costumerModel");
const { query } = require("express");

const getAllData = async (req, res, next) => {
  try {
    // 1. basic filter
    const queryObject = { ...req.query };
    const excludedColumns = ["sort", "page", "limit", "fields"];
    excludedColumns.forEach((el) => delete queryObject[el]);

    // 2. advanced filter
    // {age: {$gte: 5}}

    console.log(req.query, queryObject);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    queryStr = JSON.parse(queryStr);
    console.log(queryStr);

    let query = customer.find(queryStr);

    // 3. sort
    // sorting ASCENDING = name, kalau DECENDING = -name (PAKE - / strip)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 4. field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 5. pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    // page=3&limit=2 ===> data ke 5 dan 6
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // let numCustomers = await customer.countDocuments();
    if (req.query.page) {
      const numCustomers = await customer.countDocuments();
      if (skip >= numCustomers)
        throw new Error("This page does not exist");
    }

    // 6. upload image

    // eksekusi query
    const customers = await query;

    res.status(200).json({
      status: "success",
      toltalData: customers.length,
      requestTime: req.requestTime,
      data: {
        customers,
      },
      // totalPage: numCustomers,
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
