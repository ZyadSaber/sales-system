const pool = require("../../db");
const { normalizeTableResponse, throwTheError } = require("../../lib");

const getItemsBeginningBalanceController = async (req, res) => {
  try {
    const { offset, limit, item_name } = req.query;

    const { rows } = await pool.query(
      `
            SELECT item_id, item_name, item_cost, opening_balance
            FROM items_data 
            WHERE (item_name ILIKE '%' || $3 || '%')
            ORDER BY item_id
            LIMIT $1 OFFSET $2
        `,
      [limit || null, offset * limit || null, item_name || ""]
    );

    const { rows: total } = await pool.query(
      `
            SELECT COUNT(*) AS record_count
            FROM items_data
            WHERE (item_name ILIKE '%' || $1 || '%')
        `,
      [item_name || ""]
    );
    const [{ record_count }] = total;

    const computedData = rows.map((record) => ({
      ...record,
      item_cost_total: record.item_cost * record.opening_balance,
    }));

    res.json({
      total_records: record_count,
      data: normalizeTableResponse(computedData),
    });
  } catch (err) {
    throwTheError(err, res);
  }
};

const postItemsBeginningBalanceController = async (req, res) => {
  try {
    const { data } = req.body;
    await data.forEach(async (record) => {
      await pool.query(
        `
          UPDATE items_data SET
          item_cost = $1,
          opening_balance = $2
          WHERE item_id = $3;
          `,
        [record.item_cost, record.opening_balance, record.item_id]
      );
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    throwTheError(err, res);
  }
};

module.exports = {
  getItemsBeginningBalanceController,
  postItemsBeginningBalanceController,
};
