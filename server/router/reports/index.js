const express = require("express");
const router = express.Router();
const {
  getSalesAndPurchaseInvoiceSearch,
  getItemSummaryReport,
} = require("./controller");

router.get(
  "/get_sales_purchase_invoice_search",
  getSalesAndPurchaseInvoiceSearch
);
router.get("/get_item_summary_report", getItemSummaryReport);

module.exports = router;
