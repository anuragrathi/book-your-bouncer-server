const express = require("express");
const router = express.Router();
const itemController = require("../controller/productLineItem.controller.js");

router.post("/", itemController.createProductLineItem);
router.get("/", itemController.getAllProductLineItems);
router.put("/:id", itemController.updateproductLineItem);

module.exports = router;
