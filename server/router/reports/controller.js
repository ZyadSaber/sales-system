const pool = require("../../db");
const {
  throwTheError,
  getRequestQueryParams,
  normalizeTableResponse,
} = require("../../lib");

const getSalesAndPurchaseInvoiceSearch = async (req, res) => {
  try {
    const { limit, offset, search_type, invoice_type } =
      getRequestQueryParams(req);

    const defaultResponse = () =>
      res.json({
        total_records: 0,
        data: [],
      });

    if (search_type === "P") {
      if (invoice_type === "I") {
        const { rows } = await pool.query(
          `
            SELECT *
            FROM purchase_invoice_master
            ORDER BY invoice_number
            LIMIT $1 OFFSET $2
        `,
          [limit || null, offset * limit || null]
        );

        const { rows: total } = await pool.query(
          `
            SELECT COUNT(*) AS record_count
            FROM purchase_invoice_master
        `,
          []
        );
        const [{ record_count }] = total;

        res.json({
          total_records: record_count,
          data: normalizeTableResponse(rows),
        });
      } else if (invoice_type === "R") {
        const { rows } = await pool.query(
          `
            SELECT *
            FROM purchase_return_master
            ORDER BY return_number
            LIMIT $1 OFFSET $2
        `,
          [limit || null, offset * limit || null]
        );

        const { rows: total } = await pool.query(
          `
            SELECT COUNT(*) AS record_count
            FROM purchase_return_master
        `,
          []
        );
        const [{ record_count }] = total;

        res.json({
          total_records: record_count,
          data: normalizeTableResponse(rows),
        });
      } else {
        return defaultResponse();
      }
    } else if (search_type === "S") {
      if (invoice_type === "I") {
        const { rows } = await pool.query(
          `
            SELECT *
            FROM sales_invoice_master
            ORDER BY invoice_number
            LIMIT $1 OFFSET $2
        `,
          [limit || null, offset * limit || null]
        );

        const { rows: total } = await pool.query(
          `
            SELECT COUNT(*) AS record_count
            FROM sales_invoice_master
        `,
          []
        );
        const [{ record_count }] = total;

        res.json({
          total_records: record_count,
          data: normalizeTableResponse(rows),
        });
      } else if (invoice_type === "R") {
        const { rows } = await pool.query(
          `
            SELECT *
            FROM sales_return_master
            ORDER BY return_number
            LIMIT $1 OFFSET $2
        `,
          [limit || null, offset * limit || null]
        );

        const { rows: total } = await pool.query(
          `
            SELECT COUNT(*) AS record_count
            FROM sales_return_master
        `,
          []
        );
        const [{ record_count }] = total;

        res.json({
          total_records: record_count,
          data: normalizeTableResponse(rows),
        });
      } else {
        return defaultResponse();
      }
    } else {
      return defaultResponse();
    }
  } catch (err) {
    throwTheError(err, res);
  }
};

const getItemSummaryReport = async (req, res) => {
  const { limit, offset, item_id } = getRequestQueryParams(req);
  const { rows } = await pool.query(
    `
            SELECT *
            FROM net_item_quantities
            ORDER BY item_id
            LIMIT $1 OFFSET $2
        `,
    [limit || null, offset * limit || null]
  );

  const { rows: total } = await pool.query(
    `
            SELECT COUNT(*) AS record_count
            FROM net_item_quantities
        `,
    []
  );
  const [{ record_count }] = total;

  res.json({
    total_records: record_count,
    data: normalizeTableResponse(rows),
  });
};

module.exports = {
  getSalesAndPurchaseInvoiceSearch,
  getItemSummaryReport,
};
