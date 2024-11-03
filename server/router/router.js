const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/index"));

router.get("*", (req, res) => {
  res.send("Error 404");
});

module.exports = router;
