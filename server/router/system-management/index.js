const express = require("express");
const router = express.Router();
const {
  getPageParentDataController,
  postPageParentDataController,
  getPageSetupDataController,
  getPageParentListController,
  postPageSetupDataController,
} = require("./controller");

router.get("/get_page_parent_data", getPageParentDataController);
router.get("/get_page_parent_list", getPageParentListController);
router.post("/post_page_parent_data", postPageParentDataController);
router.get("/get_page_setup_data", getPageSetupDataController);
router.post("/post_page_setup_data", postPageSetupDataController);

module.exports = router;
