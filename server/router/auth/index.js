const express = require("express");
const router = express.Router();

router.get("/signIn", (req, res) => {
  res.json({ message: "hiiiiii" });
});

module.exports = router;
