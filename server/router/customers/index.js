const express = require("express");
const router = express.Router();
const {
    getCustomersDataController,
} = require("./controller");

router.get("/get_customer_data", getCustomersDataController);

module.exports = router;
