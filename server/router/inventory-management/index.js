const express = require("express");
const router = express.Router();
const {
  getItemsBeginningBalanceController,
  postItemsBeginningBalanceController,
} = require("./controller");

router.get("/get_customer_data", getItemsBeginningBalanceController);
router.post("/post_customer_data", postItemsBeginningBalanceController);

module.exports = router;
