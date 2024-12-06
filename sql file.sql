CREATE TABLE page_parent (
    parent_id SERIAL PRIMARY KEY,
    parent_name VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

SELECT * FROM page_parent;

CREATE TABLE customers_data (
    customer_id SERIAL PRIMARY KEY,          -- Auto-incrementing primary key
    customer_name VARCHAR(100) UNIQUE NOT NULL,      -- Page name, required
    phone_number VARCHAR(255),        -- Active status, default is true
    address VARCHAR(255),                        -- Foreign key to page_parent
	note TEXT

    -- FOREIGN KEY (parent_id) REFERENCES page_parent(parent_id) ON DELETE SET NULL
);

SELECT * FROM customers_data

CREATE TABLE suppliers_data (
    supplier_id SERIAL PRIMARY KEY,          -- Auto-incrementing primary key
    supplier_name VARCHAR(100) UNIQUE NOT NULL,      -- Page name, required
    phone_number VARCHAR(255),        -- Active status, default is true
    address VARCHAR(255),                        -- Foreign key to page_parent
	note TEXT

    -- FOREIGN KEY (parent_id) REFERENCES page_parent(parent_id) ON DELETE SET NULL
);

SELECT * FROM suppliers_data

SELECT
    pp.parent_id,
    pp.parent_name,
    sp.page_id,
    sp.page_name,
    sp.is_active AS page_is_active
FROM
    page_parent pp
LEFT JOIN
    system_page sp ON pp.parent_id = sp.parent_id

WHERE
	pp.is_active IS NOT FALSE
ORDER BY
    pp.parent_id, sp.page_id;


ALTER TABLE page_parent
ADD COLUMN parent_order INT NOT NULL DEFAULT 1;


SELECT * FROM system_page

SELECT * FROM page_parent;

ALTER TABLE purchase_invoice_details
ADD COLUMN invoice_number INT NOT NULL DEFAULT 1;

ALTER TABLE purchase_invoice_details
ADD CONSTRAINT fk_invoice_number
FOREIGN KEY (invoice_number) REFERENCES purchase_invoice_master(invoice_number) ON DELETE SET NULL;