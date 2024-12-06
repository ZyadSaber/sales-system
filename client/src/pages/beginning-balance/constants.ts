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
  },
  {
    title: "item_cost",
    field: "item_cost",
    width: "20%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
  {
    title: "opening_balance",
    field: "opening_balance",
    width: "20%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
  {
    title: "item_cost_total",
    field: "item_cost_total",
    width: "20%",
  },
];
