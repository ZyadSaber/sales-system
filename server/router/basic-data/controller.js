const pool = require("../../db");
const {
  normalizeTableResponse,
  throwTheError,
  normalizeList,
} = require("../../lib");

const getCustomersDataController = async (req, res) => {
  try {
    const { offset, limit, customer_name, customer_phone } = req.query;

    const { rows } = await pool.query(
      `
            SELECT *
            FROM customers_data
            WHERE (customer_name ILIKE '%' || $3 || '%')
               AND (phone_number ILIKE '%' || $4 || '%')
            ORDER BY customer_id
            LIMIT $1 OFFSET $2
        `,
      [
        limit || null,
        offset * limit || null,
        customer_name || "",
        customer_phone || "",
      ]
    );

    const { rows: total } = await pool.query(
      `
            SELECT COUNT(*) AS record_count
            FROM customers_data
            WHERE (customer_name ILIKE '%' || $1 || '%')
               AND (phone_number ILIKE '%' || $2 || '%')
        `,
      [customer_name || "", customer_phone || ""]
    );
    const [{ record_count }] = total;

    res.json({
      total_records: record_count,
      data: normalizeTableResponse(rows),
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const postCustomersDataController = async (req, res) => {
  try {
    const { data } = req.body;
    await data.forEach(async (record) => {
      if (record.record_status === "n") {
        await pool.query(
          `
          INSERT INTO customers_data
          (customer_name, phone_number, address, note)
          values ($1, $2, $3, $4);
          `,
          [
            record.customer_name,
            record.phone_number,
            record.address,
            record.note,
          ]
        );
      } else if (record.record_status === "u") {
        await pool.query(
          `
          UPDATE customers_data SET
          customer_name = $1,
          phone_number = $2,
          address = $3,
          note = $4
          WHERE customer_id = $5;
          `,
          [
            record.customer_name,
            record.phone_number,
            record.address,
            record.note,
            record.customer_id,
          ]
        );
      } else if (record.record_status === "d") {
        await pool.query("DELETE FROM customers_data WHERE customer_id = $1;", [
          record.customer_id,
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

const getSuppliersDataController = async (req, res) => {
  try {
    const { offset, limit, supplier_name, supplier_phone } = req.query;

    const { rows } = await pool.query(
      `
            SELECT *
            FROM suppliers_data
            WHERE (supplier_name ILIKE '%' || $3 || '%')
               AND (phone_number ILIKE '%' || $4 || '%')
            ORDER BY supplier_id
            LIMIT $1 OFFSET $2
        `,
      [
        limit || null,
        offset * limit || null,
        supplier_name || "",
        supplier_phone || "",
      ]
    );

    const { rows: total } = await pool.query(
      `
            SELECT COUNT(*) AS record_count
            FROM suppliers_data
            WHERE (supplier_name ILIKE '%' || $1 || '%')
               AND (phone_number ILIKE '%' || $2 || '%')
        `,
      [supplier_name || "", supplier_phone || ""]
    );
    const [{ record_count }] = total;

    res.json({
      total_records: record_count,
      data: normalizeTableResponse(rows),
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const postSuppliersDataController = async (req, res) => {
  try {
    const { data } = req.body;
    await data.forEach(async (record) => {
      if (record.record_status === "n") {
        await pool.query(
          `
          INSERT INTO suppliers_data
          (supplier_name, phone_number, address, note)
          values ($1, $2, $3, $4);
          `,
          [
            record.supplier_name,
            record.phone_number,
            record.address,
            record.note,
          ]
        );
      } else if (record.record_status === "u") {
        await pool.query(
          `
          UPDATE suppliers_data SET
          supplier_name = $1,
          phone_number = $2,
          address = $3,
          note = $4
          WHERE supplier_id = $5;
          `,
          [
            record.supplier_name,
            record.phone_number,
            record.address,
            record.note,
            record.supplier_id,
          ]
        );
      } else if (record.record_status === "d") {
        await pool.query("DELETE FROM suppliers_data WHERE supplier_id = $1;", [
          record.supplier_id,
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

const getItemsDataController = async (req, res) => {
  try {
    const { offset, limit, item_name } = req.query;

    const { rows } = await pool.query(
      `
            SELECT item_id, item_name, item_base_price, item_unit, note
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

    res.json({
      total_records: record_count,
      data: normalizeTableResponse(rows),
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const postItemsDataController = async (req, res) => {
  try {
    const { data } = req.body;
    await data.forEach(async (record) => {
      if (record.record_status === "n") {
        await pool.query(
          `
          INSERT INTO items_data
          (item_name, item_unit, item_base_price, note)
          values ($1, $2, $3, $4);
          `,
          [
            record.item_name,
            record.item_unit,
            record.item_base_price,
            record.note,
          ]
        );
      } else if (record.record_status === "u") {
        await pool.query(
          `
          UPDATE items_data SET
          item_name = $1,
          item_unit = $2,
          item_base_price = $3,
          note = $4
          WHERE item_id = $5;
          `,
          [
            record.item_name,
            record.item_unit,
            record.item_base_price,
            record.note,
            record.item_id,
          ]
        );
      } else if (record.record_status === "d") {
        await pool.query("DELETE FROM items_data WHERE item_id = $1;", [
          record.item_id,
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

const getCustomersListController = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM customers_data;");
    res.json(normalizeList(rows, "customer_id", "customer_name", true));
  } catch (err) {
    throwTheError(err, res);
  }
};

const getSuppliersListController = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM suppliers_data;");
    res.json(normalizeList(rows, "supplier_id", "supplier_name", true));
  } catch (err) {
    throwTheError(err, res);
  }
};

const getItemsListController = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT item_id, item_name, item_unit, item_base_price FROM items_data;"
    );
    res.json(normalizeList(rows, "item_id", "item_name", true));
  } catch (err) {
    throwTheError(err, res);
  }
};

module.exports = {
  getCustomersDataController,
  postCustomersDataController,
  getSuppliersDataController,
  postSuppliersDataController,
  getItemsDataController,
  postItemsDataController,
  getCustomersListController,
  getItemsListController,
  getSuppliersListController,
};
