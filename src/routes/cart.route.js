const express = require("express");
const router = express.Router();
const cartcontroller = require("../controller/cart.controller.js");
const Auth = require("../middleware/authmiddleware.js")


router.post("/add",Auth,cartcontroller.addToReservation);
router.post("/view",Auth,cartcontroller.getAllReservation);
router.post("/remove",Auth,cartcontroller.removeReservation);
router.post("/merge",Auth,cartcontroller.mergeCart);

module.exports = router;
