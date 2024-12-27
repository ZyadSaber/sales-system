const express = require("express");
const router = express.Router();
const {
  postSupplierInvoiceController,
  postSupplierReturnController,
} = require("./controller");

router.post("/post_supplier_invoice", postSupplierInvoiceController);
router.post("/post_supplier_return", postSupplierReturnController);

module.exports = router;
