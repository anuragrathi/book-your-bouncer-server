const express = require("express");
const router = express.Router();
const filter = require("../controller/filter.controller.js")

router.post("/newfilter",filter.filteration);

module.exports = router;