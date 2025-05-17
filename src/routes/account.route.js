const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller.js");

router.post("/", accountController.createAccount);
router.get("/", accountController.getAllAccounts);

module.exports = router;
