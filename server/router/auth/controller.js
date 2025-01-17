const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  throwTheError,
  getRequestQueryParams,
  normalizeTableResponse,
} = require("../../lib");

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
      delete foundUser?.refresh_token;
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        ...foundUser,
        access_token: accessToken,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const validateTokenController = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies?.jwt;

  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  const { rows } = await pool.query(
    "SELECT * FROM users WHERE refresh_token = $1 LIMIT 1;",
    [refreshToken]
  );

  const [foundUser] = rows;

  if (!foundUser) return res.status(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, { user_name }) => {
      if ((err, foundUser.user_name !== user_name)) return res.status(403);

      const accessToken = jwt.sign(
        {
          user_name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      delete foundUser?.password;
      delete foundUser?.refresh_token;

      res.json({
        ...foundUser,
        access_token: accessToken,
        site_name: process.env.SITE_NAME,
        branch_name: "test branch",
      });
    }
  );
};

const getMenuTreeController = async (req, res) => {
  try {
    const { rows } = await pool.query(` 
SELECT 
    pp.parent_id,
    pp.parent_name,
    sp.page_id,
    sp.page_name,
    sp.page_path
FROM 
    page_parent pp
LEFT JOIN 
    system_page sp ON pp.parent_id = sp.parent_id

WHERE 
	pp.is_active IS NOT FALSE AND sp.is_active IS NOT FALSE
ORDER BY 
    pp.parent_order, sp.page_id;
`);

    let computedMenu = [];

    rows.forEach((record) => {
      const ifFoundItem = computedMenu.find(
        (item) => item.parent_id === record.parent_id
      );
      if (ifFoundItem) {
        computedMenu.map((computedRecord) => {
          if (computedRecord.parent_id === ifFoundItem.parent_id) {
            computedRecord.linked_page.push({
              page_id: record.page_id,
              page_name: record.page_name,
              page_path: record.page_path,
            });
          }
          return record;
        });
        return;
      }
      const linked_page = !record.page_id
        ? []
        : [
            {
              page_id: record.page_id,
              page_name: record.page_name,
              page_path: record.page_path,
            },
          ];
      computedMenu.push({
        parent_id: record.parent_id,
        parent_name: record.parent_name,
        linked_page,
      });
    });

    res.json(computedMenu);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};

const getUsersDataController = async (req, res) => {
  const { limit, offset } = getRequestQueryParams(req);
  const { rows } = await pool.query(
    `
            SELECT 

              user_id,
              user_name,
              first_name,
              second_name, 
              default_page,
              is_active

            FROM users
            ORDER BY user_id
            LIMIT $1 OFFSET $2
        `,
    [limit || null, offset * limit || null]
  );

  const { rows: total } = await pool.query(
    `
            SELECT COUNT(*) AS record_count
            FROM users
        `,
    []
  );
  const [{ record_count }] = total;

  res.json({
    total_records: record_count,
    data: normalizeTableResponse(rows),
  });
};

const postUsersDataController = async (req, res) => {
  try {
    const { data } = req.body;
    data.forEach(async (record) => {
      let hashedPassword = record.password;

      bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(hashedPassword, salt, function (err, hash) {
          hashedPassword = hash;
        });
      });

      if (record.record_status === "n") {
        await pool.query(
          `INSERT INTO users 
           (user_name, first_name, second_name, default_page, is_active, password)
            VALUES
            ($1, $2, $3, $4, $5, $6)`,
          [
            record.user_name,
            record.first_name,
            record.second_name,
            record.default_page,
            record.is_active,
            hashedPassword,
          ]
        );
      } else if (record.record_status === "u") {
        const { rows } = await pool.query(
          `select password from users where user_id=$1`,
          record.user_id
        );
        const oldUserPassword = rows[0].password;

        await pool.query(
          `
          UPDATE users SET
           user_name = $2,
            first_name = $3,
             second_name = $4, 
             default_page=$5,
             is_active=$6,
             password=$7
             WHERE user_id = $1
          `,
          [
            record.user_id,
            record.user_name,
            record.first_name,
            record.second_name,
            record.default_page,
            record.is_active,
            record?.password ? hashedPassword : oldUserPassword,
          ]
        );
      } else if (record.record_status === "d") {
        await pool.query("DELETE FROM users WHERE user_id = $1;", [
          record.user_id,
        ]);
      }
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
};

module.exports = {
  signInController,
  validateTokenController,
  getMenuTreeController,
  getUsersDataController,
  postUsersDataController,
};
