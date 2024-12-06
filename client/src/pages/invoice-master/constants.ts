export const pageEndPoints = {
  purchaseInvoice: {
    mainListLabel: "supplier",
    mainListApi: "GET_SUPPLIERS_LIST",
    mainListName: "supplier_id",
    postApi: "POST_NEW_PURCHASE_INVOICE_ITEMS",
  },
  salesInvoice: {
    mainListLabel: "customer",
    mainListApi: "GET_CUSTOMERS_LIST",
    mainListName: "customer_id",
    postApi: "POST_NEW_SALES_INVOICE_ITEMS",
  },
  purchaseReturn: {
    mainListLabel: "supplier",
    mainListApi: "GET_SUPPLIERS_LIST",
    mainListName: "supplier_id",
    postApi: "POST_NEW_PURCHASE_RETURN_ITEMS",
  },
  salesReturn: {
    mainListLabel: "customer",
    mainListApi: "GET_CUSTOMERS_LIST",
    mainListName: "customer_id",
    postApi: "POST_NEW_SALES_INVOICE_ITEMS",
  },
};

export const initialValues = {
  phone_number: "",
  address: "",
  note: "",
  invoice_details: [],
  invoice_total: 0,
  net_total: 0,
  invoice_discount: 0,
};

export const tableColumns = [
  {
    title: "item_id",
    field: "item_id",
    width: "10%",
  },
  {
    title: "item_name",
    field: "item_id",
    width: "30%",
    inputProps: {
      inputType: "selectWithApi",
      apiId: "GET_ITEMS_LIST",
    },
  },
  {
    title: "item_unit",
    field: "item_unit",
    width: "10%",
  },
  {
    title: "qty",
    field: "qty",
    width: "20%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
  {
    title: "price",
    field: "price",
    width: "20%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
  {
    title: "total",
    field: "total",
    width: "20%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
];
