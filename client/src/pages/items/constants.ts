export const tableColumns = [
  {
    title: "item_id",
    field: "item_id",
    width: "10%",
  },
  {
    title: "item_name",
    field: "item_name",
    width: "30%",
    inputProps: {
      inputType: "text",
    },
  },
  {
    title: "item_unit",
    field: "item_unit",
    width: "20%",
    inputProps: {
      inputType: "text",
    },
  },
  {
    title: "item_base_price",
    field: "item_base_price",
    width: "20%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
  {
    title: "note",
    field: "note",
    width: "20%",
    inputProps: {
      inputType: "text",
    },
  },
];
