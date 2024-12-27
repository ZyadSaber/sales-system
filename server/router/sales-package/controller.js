const pool = require("../../db");
const { throwTheError } = require("../../lib");

const postCustomerInvoiceController = async (req, res) => {
  try {
    const {
      customer_id,
      invoice_details,
      invoice_total,
      invoice_discount,
      net_total,
    } = req.body;

    const { rows: itemsQty } = await pool.query(
      `
          SELECT * FROM net_item_quantities
        `
    );

    let isThereNoQty = [];

    invoice_details.forEach((record) => {
      const [{ qty }] = itemsQty.filter(
        (filterRecord) => filterRecord.item_id === record.item_id
      );
      if (qty === record.qty) isThereNoQty.push(record);
    });

    if (isThereNoQty.length !== 0) {
      return throwTheError("there is no available qty for some items", res);
    }

    const { rows } = await pool.query(
      `
      INSERT INTO sales_invoice_master 
      (customer_id, invoice_total, invoice_discount, net_total)
       VALUES ($1, $2, $3, $4) 
       RETURNING invoice_number
      `,
      [customer_id, invoice_total, invoice_discount || 0, net_total]
    );

    const { invoice_number } = rows[0];

    await invoice_details.map(async (record) => {
      await pool.query(
        `
      INSERT INTO sales_invoice_details 
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

const postCustomerReturnController = async (req, res) => {
  try {
    const {
      customer_id,
      invoice_details,
      invoice_total,
      invoice_discount,
      net_total,
    } = req.body;

    const { rows } = await pool.query(
      `
      INSERT INTO sales_return_master 
      (customer_id, return_total, return_discount, net_total)
       VALUES ($1, $2, $3, $4) 
       RETURNING return_number
      `,
      [customer_id, invoice_total, invoice_discount || 0, net_total]
    );

    const { return_number } = rows[0];

    await invoice_details.map(async (record) => {
      await pool.query(
        `
      INSERT INTO sales_return_details 
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
  postCustomerInvoiceController,
  postCustomerReturnController,
};
