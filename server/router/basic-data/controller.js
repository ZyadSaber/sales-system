const pool = require("../../db");

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
      data: rows,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const postCustomersDataController = async (req, res) => {
  try {
    const { data } = req.body;
    data.forEach(async (record) => {
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
      data: rows,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const postSuppliersDataController = async (req, res) => {
  try {
    const { data } = req.body;
    data.forEach(async (record) => {
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

module.exports = {
  getCustomersDataController,
  postCustomersDataController,
  getSuppliersDataController,
  postSuppliersDataController,
};
