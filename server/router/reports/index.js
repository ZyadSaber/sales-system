const express = require("express");
const router = express.Router();
const {
  getSalesAndPurchaseInvoiceSearch,
  getItemSummaryReport,
  getCustomerReport,
  getSupplierReport,
} = require("./controller");

router.get(
  "/get_sales_purchase_invoice_search",
  getSalesAndPurchaseInvoiceSearch
);
router.get("/get_item_summary_report", getItemSummaryReport);
router.get("/get_customer_report", getCustomerReport);
router.get("/get_supplier_report", getSupplierReport);

module.exports = router;
