const API_ID = {
  //http://localhost:5000/api/auth/validate_token
  GET_VALIDATE_TOKEN: "auth/validate_token",
  //http://localhost:5000/api/auth/sign_in
  POST_LOG_IN_USER: "auth/sign_in",
  //http://localhost:5000/api/auth/get_menu_tree
  GET_MENU_TREE: "auth/get_menu_tree",
  //http://localhost:5000/api/basic_data/get_customer_data
  GET_CUSTOMERS_TABLE_DATA: "basic_data/get_customer_data",
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
};

export default API_ID;
