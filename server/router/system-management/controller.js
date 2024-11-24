const pool = require("../../db");
const { normalizeTableResponse, normalizeList } = require("../../lib");

const getPageParentDataController = async (req, res) => {
  try {
    const { offset, limit, parent_name, is_active } = req.query;

    const { rows } = await pool.query(
      `
        SELECT *
        FROM page_parent
        WHERE 
          (parent_name ILIKE '%' || $3 || '%') 
          AND ( is_active = ${is_active || true})
        ORDER BY parent_order
        LIMIT $1 OFFSET $2;
      `,
      [limit || null, offset * limit || null, parent_name || ""]
    );

    const { rows: total } = await pool.query(
      `
        SELECT COUNT(*) AS record_count
        FROM page_parent
        WHERE 
          (parent_name ILIKE '%' || $1 || '%') 
          AND ( is_active = ${is_active || true})
      `,
      [parent_name || ""]
    );
    const [{ record_count }] = total;

    res.json({
      total_records: record_count,
      data: normalizeTableResponse(rows),
    });
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
};

const getPageParentListController = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT parent_id, parent_name FROM page_parent ORDER BY parent_id"
    );
    const computedList = normalizeList(rows, "parent_id", "parent_name");
    res.json(computedList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

const postPageParentDataController = async (req, res) => {
  try {
    const { data } = req.body;
    data.forEach(async (record) => {
      if (record.record_status === "n") {
        await pool.query(
          "INSERT INTO page_parent (parent_name, parent_order, is_active) VALUES ($1, $2, $3);",
          [record.parent_name, record.parent_order, record.is_active]
        );
      } else if (record.record_status === "u") {
        await pool.query(
          "UPDATE page_parent SET parent_name = $1, parent_order = $2, is_active = $3 WHERE parent_id = $4;",
          [
            record.parent_name,
            record.parent_order,
            record.is_active,
            record.parent_id,
          ]
        );
      } else if (record.record_status === "d") {
        await pool.query("DELETE FROM page_parent WHERE parent_id = $1;", [
          record.parent_id,
        ]);
      }
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getPageSetupDataController = async (req, res) => {
  try {
    const { offset, limit, page_name, is_active } = req.query;

    const { rows } = await pool.query(
      `
        SELECT *
        FROM system_page
        WHERE 
          (page_name ILIKE '%' || $3 || '%') 
          AND ( is_active = ${is_active || true})
        ORDER BY page_id
        LIMIT $1 OFFSET $2;
      `,
      [limit || null, offset * limit || null, page_name || ""]
    );

    const { rows: total } = await pool.query(
      `
        SELECT COUNT(*) AS record_count
        FROM system_page
        WHERE 
          (page_name ILIKE '%' || $1 || '%') 
          AND ( is_active = ${is_active || true})
      `,
      [page_name || ""]
    );
    const [{ record_count }] = total;

    res.json({
      total_records: record_count,
      data: normalizeTableResponse(rows),
    });
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
};

const postPageSetupDataController = async (req, res) => {
  try {
    const { data } = req.body;
    data.forEach(async (record) => {
      if (record.record_status === "n") {
        await pool.query(
          "INSERT INTO system_page (page_name, parent_id, is_active, page_path) VALUES ($1, $2, $3, $4);",
          [
            record.page_name,
            record.parent_id,
            record.is_active,
            record.page_path,
          ]
        );
      } else if (record.record_status === "u") {
        await pool.query(
          "UPDATE system_page SET page_name = $1, parent_id = $2, is_active = $3, page_path=$5 WHERE page_id = $4;",
          [
            record.page_name,
            record.parent_id,
            record.is_active,
            record.page_id,
            record.page_path,
          ]
        );
      } else if (record.record_status === "d") {
        await pool.query("DELETE FROM system_page WHERE page_id = $1;", [
          record.page_id,
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
  getPageParentDataController,
  postPageParentDataController,
  getPageSetupDataController,
  getPageParentListController,
  postPageSetupDataController,
};
