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
