const express = require("express");
const router = express.Router();
const { join } = require("path");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router.use("/auth", require("./auth/index"));

router.use((req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    // example restricted methods
    res.status(405).sendFile(join(__dirname, "..", "views", "405.html"));
  } else {
    next();
  }
});

router.get("*", (req, res) => {
  res.status(404).sendFile(join(__dirname, "..", "views", "404.html"));
});

module.exports = router;
