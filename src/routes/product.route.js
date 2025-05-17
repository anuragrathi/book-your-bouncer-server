const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
