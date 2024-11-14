const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signInController = async (req, res) => {
  try {
    const { user_name, password } = req.body || {};

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_name = $1 LIMIT 1;",
      [user_name]
    );
    const [foundUser] = rows;
    const isMatch = foundUser
      ? await bcrypt.compare(password, foundUser.password)
      : false;

    if (isMatch && foundUser.is_active) {
      accessToken = jwt.sign(
        {
          user_name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      refreshToken = jwt.sign(
        {
          user_name,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      await pool.query(
        "UPDATE users SET refresh_token = $1 WHERE user_name = $2;",
        [refreshToken, user_name]
      );

      delete foundUser?.password;
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        ...foundUser,
        accessToken,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const validateTokenController = (req, res) => {
  return res.json({ message: "ok" });
};

module.exports = {
  signInController,
  validateTokenController,
};
