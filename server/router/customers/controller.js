const pool = require("../../db");

const getCustomersDataController = async (req, res) => {
    try {
        const {offset, limit, customer_name, customer_phone} = req.query

        const {rows} = await pool.query(`
            SELECT *
            FROM customers_data
            WHERE (customer_name ILIKE '%' || $3 || '%')
               AND (phone_number ILIKE '%' || $4 || '%')
            ORDER BY customer_id
            LIMIT $1 OFFSET $2
        `, [limit||null, offset||null, customer_name||"", customer_phone||""]);

        const {rows: total} = await pool.query(`
            SELECT COUNT(*) AS record_count
            FROM customers_data
            WHERE (customer_name ILIKE '%' || $1 || '%')
               AND (phone_number ILIKE '%' || $2 || '%')
        `, [customer_name||"", customer_phone||""])
        const [{record_count}] = total

        res.json({
            total_records: record_count,
            data: rows,
        })
    } catch (err) {
        console.log(err);
        res.json({error: err});
    }
}

module.exports = {getCustomersDataController}