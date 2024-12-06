const express = require("express");
const router = express.Router();
const { postCustomerInvoiceController } = require("./controller");

router.post("/post_customer_invoice", postCustomerInvoiceController);

module.exports = router;
