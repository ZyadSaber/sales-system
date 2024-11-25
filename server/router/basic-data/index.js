const express = require("express");
const router = express.Router();
const {
  getCustomersDataController,
  postCustomersDataController,
  getSuppliersDataController,
  postSuppliersDataController,
} = require("./controller");

router.get("/get_customer_data", getCustomersDataController);
router.post("/post_customer_data", postCustomersDataController);
router.get("/get_suppliers_data", getSuppliersDataController);
router.post("/post_suppliers_data", postSuppliersDataController);

module.exports = router;
