const pool = require("../../db");
const { throwTheError } = require("../../lib");

const postSupplierInvoiceController = async (req, res) => {
  try {
    const {
      supplier_id,
      invoice_details,
      invoice_total,
      invoice_discount,
      net_total,
    } = req.body;

    const { rows } = await pool.query(
      `
      INSERT INTO purchase_invoice_master 
      (supplier_id, invoice_total, invoice_discount, net_total)
       VALUES ($1, $2, $3, $4) 
       RETURNING invoice_number
      `,
      [supplier_id, invoice_total, invoice_discount, net_total]
    );

    const { invoice_number } = rows[0];

    await invoice_details.map(async (record) => {
      await pool.query(
        `
      INSERT INTO purchase_invoice_details 
      (invoice_number, item_id, qty, price, total)
       VALUES ($1, $2, $3, $4, $5) 
      `,
        [invoice_number, record.item_id, record.qty, record.price, record.total]
      );
    });

    res.json({
      status: "success",
    });
  } catch (err) {
    throwTheError(err, res);
  }
};

const postSupplierReturnController = async (req, res) => {
  try {
    const {
      supplier_id,
      invoice_details,
      invoice_total,
      invoice_discount,
      net_total,
    } = req.body;

    const { rows } = await pool.query(
      `
      INSERT INTO purchase_return_master 
      (supplier_id, return_total, return_discount, net_total)
       VALUES ($1, $2, $3, $4) 
       RETURNING return_number
      `,
      [supplier_id, invoice_total, invoice_discount || 0, net_total]
    );

    const { return_number } = rows[0];

    await invoice_details.map(async (record) => {
      await pool.query(
        `
      INSERT INTO purchase_return_details 
      (return_number, item_id, qty, price, total)
       VALUES ($1, $2, $3, $4, $5) 
      `,
        [return_number, record.item_id, record.qty, record.price, record.total]
      );
    });

    res.json({
      status: "success",
    });
  } catch (err) {
    throwTheError(err, res);
  }
};

module.exports = {
  postSupplierInvoiceController,
  postSupplierReturnController,
};
