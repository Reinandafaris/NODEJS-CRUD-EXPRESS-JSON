const fs = require("fs");
const express = require("express");
const uuid = require("uuid");
const uniqueId = uuid.v4();

const app = express();
const PORT = 8000;

// middleware untuk membaca json dari request body ke kita
app.use(express.json());

const costumers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/dummy.json`)
);

const defaultRouter = (req, res) => {
  res.send("<h1>Hello World!</h1>");
};

const getAllData = (req, res, next) => {
  res.status(200).json({
    status: "success",
    toltalData: costumers.length,
    data: {
      costumers,
    },
  });
};

const getDataById = (req, res, next) => {
  const id = req.params.id;
  const costumer = costumers.find((costumer) => costumer.id === id);

  if (!costumer) {
    return res.status(404).json({
      status: "fail",
      message: `data ID: ${id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      costumer,
    },
  });
};

const createData = (req, res, next) => {
  console.log(req.body);

  const data = req.body;
  const newCostumer = {
    id: uniqueId,
    ...data,
  };

  costumers.push(newCostumer);

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(costumers),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          costumer: newCostumer,
        },
      });
    }
  );

  // res.send("data created");
};

const patchData = (req, res, next) => {
  const id = req.params.id;
  const updateData = req.body;

  // 1. melakukan pencarian data berdasarkan id
  const index = costumers.findIndex((costumer) => costumer.id === id);

  // 2. ada gak data costumer nya
  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `data ID: ${id} not found`,
    });
  }

  costumers[index] = {
    id,
    ...updateData,
  };

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(costumers),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          costumer: costumers[index],
        },
        massage: "data has been updated",
      });
    }
  );
};

const putData = (req, res, next) => {
  const id = req.params.id;
  const updateData = req.body;

  const index = costumers.findIndex((costumer) => costumer.id === id);
  costumers[index] = {
    id,
    ...updateData,
  };

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(costumers),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          costumer: costumers[index],
        },
        massage: "data has been updated",
      });
    }
  );
};

const deleteData = (req, res, next) => {
  const id = req.params.id;
  const index = costumers.findIndex((costumer) => costumer.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: `data ID: ${id} not found`,
    });
  }

  costumers.splice(index, 1);

  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(costumers),
    (err) => {
      res.status(200).json({
        status: "success",
        data: null,
        massage: "data has been deleted",
      });
    }
  );
};

app.get("/", defaultRouter);

app
  .route("/api/v1/costumers")
  .get(getAllData)
  .post(createData)

app
  .route("/api/v1/costumers/:id")
  .get(getDataById)
  .patch(patchData)
  .put(putData)
  .delete(deleteData);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
