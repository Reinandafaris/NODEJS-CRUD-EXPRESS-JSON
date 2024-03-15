const express = require("express");

const router = express.Router();

const costumersController = require("../controllers/costumerController");

router
  .route("/")
  .get(costumersController.getAllData)
  .post(costumersController.createData);

router
  .route("/:id")
  .get(costumersController.getDataById)
  .patch(costumersController.patchData)
  .put(costumersController.putData)
  .delete(costumersController.deleteData);

module.exports = router;
