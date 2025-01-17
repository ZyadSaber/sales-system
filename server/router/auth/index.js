const express = require("express");
const router = express.Router();
const {
  signInController,
  validateTokenController,
  getMenuTreeController,
  getUsersDataController,
  postUsersDataController,
} = require("./controller");

router.post("/sign_in", signInController);
router.get("/validate_token", validateTokenController);
router.get("/get_menu_tree", getMenuTreeController);
router.get("/get_users_data", getUsersDataController);
router.post("/post_users_data", postUsersDataController);

module.exports = router;
