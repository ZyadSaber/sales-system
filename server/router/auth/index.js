const express = require("express");
const router = express.Router();
const {
  signInController,
  validateTokenController,
  getMenuTreeController,
} = require("./controller");

router.post("/sign_in", signInController);
router.get("/validate_token", validateTokenController);
router.get("/get_menu_tree", getMenuTreeController);

module.exports = router;
