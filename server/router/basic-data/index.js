const express = require("express");
const router = express.Router();
const {
  getCustomersDataController,
  postCustomersDataController,
  getSuppliersDataController,
  postSuppliersDataController,
  getItemsDataController,
  postItemsDataController,
  getCustomersListController,
  getItemsListController,
  getSuppliersListController,
} = require("./controller");

router.get("/get_customer_data", getCustomersDataController);
router.post("/post_customer_data", postCustomersDataController);
router.get("/get_suppliers_data", getSuppliersDataController);
router.post("/post_suppliers_data", postSuppliersDataController);
router.get("/get_items_data", getItemsDataController);
router.post("/post_items_data", postItemsDataController);
router.get("/get_customer_list", getCustomersListController);
router.get("/get_supplier_list", getSuppliersListController);
router.get("/get_items_list", getItemsListController);

module.exports = router;
