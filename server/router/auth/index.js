const express = require("express");
const router = express.Router();
const { signInController, validateTokenController } = require("./controller");

router.post("/sign_in", signInController);
router.get("/validate_token", validateTokenController);

module.exports = router;
