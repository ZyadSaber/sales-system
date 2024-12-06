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

    const isThereNoQty = await invoice_details.map(async (record) => {
      const { item_id, qty } = record;

      const { rows } = await pool.query(
        `
          SELECT * FROM net_item_quantities WHERE item_id=$1
        `,
        [item_id]
      );

      const { net_quantity } = rows[0];

      if (net_quantity < qty) return record;
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
      [customer_id, invoice_total, invoice_discount, net_total]
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

module.exports = {
  postCustomerInvoiceController,
};
