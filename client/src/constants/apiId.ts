const API_ID = {
  //http://localhost:5000/api/auth/validate_token
  GET_VALIDATE_TOKEN: "auth/validate_token",
  //http://localhost:5000/api/auth/sign_in
  POST_LOG_IN_USER: "auth/sign_in",
  //http://localhost:5000/api/auth/get_menu_tree
  GET_MENU_TREE: "auth/get_menu_tree",
  //http://localhost:5173/api/basic_data/get_customer_data?limit=10&offset=0&customer_name=&phone_number=
  GET_CUSTOMERS_TABLE_DATA: "basic_data/get_customer_data",
  //http://localhost:5173/api/basic_data/post_customer_data
  POST_CUSTOMERS_TABLE_DATA: "basic_data/post_customer_data",
  //http://localhost:5173/api/system_management/get_page_parent_data?limit=10&offset=0&parent_name=&is_active=false
  GET_PAGE_PARENT_DATA: "system_management/get_page_parent_data",
  //http://localhost:5173/api/system_management/post_page_parent_data
  POST_PAGE_PARENT_DATA: "system_management/post_page_parent_data",
  //http://localhost:5173/api/system_management/get_page_setup_data?limit=10&offset=0&parent_name=
  GET_PAGE_SETUP_TABLE_DATA: "system_management/get_page_setup_data",
  //http://localhost:5173/api/system_management/get_page_parent_list
  GET_PAGE_PARENT_LISt: "system_management/get_page_parent_list",
  //http://localhost:5173/api/system_management/post_page_setup_data
  POST_PAGE_SETUP_TABLE_DATA: "system_management/post_page_setup_data",
  GET_SUPPLIERS_TABLE_DATA: "basic_data/get_suppliers_data",
  POST_SUPPLIERS_TABLE_DATA: "basic_data/post_suppliers_data",
  GET_ITEMS_TABLE_DATA: "basic_data/get_items_data",
  POST_ITEMS_TABLE_DATA: "basic_data/post_items_data",
  GET_ITEMS_OPENING_BALANCE_TABLE_DATA:
    "inventory_management/get_customer_data",
  POST_ITEMS_OPENING_BALANCE_TABLE_DATA:
    "inventory_management/post_customer_data",
  GET_CUSTOMERS_LIST: "basic_data/get_customer_list",
  GET_SUPPLIERS_LIST: "basic_data/get_supplier_list",
  GET_ITEMS_LIST: "basic_data/get_items_list",
  POST_NEW_PURCHASE_INVOICE_ITEMS: "purchase_package/post_supplier_invoice",
  POST_NEW_PURCHASE_RETURN_ITEMS: "purchase_package/post_supplier_return",
  POST_NEW_SALES_INVOICE_ITEMS: "sales_package/post_customer_invoice",
  POST_NEW_SALES_RETURN_ITEMS: "sales_package/post_customer_return",
  GET_SALES_PURCHASE_INVOICE_SEARCH_DATA:
    "reports/get_sales_purchase_invoice_search",
  GET_ITEM_SUMMARY_DATA: "reports/get_item_summary_report",
};

export default API_ID;
