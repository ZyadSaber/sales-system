const express = require("express");
const router = express.Router();
const { postSupplierInvoiceController } = require("./controller");

router.post("/post_supplier_invoice", postSupplierInvoiceController);

module.exports = router;
