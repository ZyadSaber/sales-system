const express = require("express");
const router = express.Router();
const {
  postCustomerInvoiceController,
  postCustomerReturnController,
} = require("./controller");

router.post("/post_customer_invoice", postCustomerInvoiceController);
router.post("/post_customer_return", postCustomerReturnController);

module.exports = router;
