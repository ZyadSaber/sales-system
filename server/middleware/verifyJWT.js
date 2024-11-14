const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const pathToIgnore = ["/auth/sign_in", "/auth/validate_token"];
  if (pathToIgnore.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .sendStatus(403)
        .json({ error: "your session is over, please log in again" });
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
