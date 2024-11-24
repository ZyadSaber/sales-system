export const tableColumns = [
  {
    title: "parent_id",
    field: "parent_id",
    width: "14%",
  },
  {
    title: "parent_name",
    field: "parent_name",
    width: "34%",
    inputProps: {
      inputType: "text",
    },
  },
  {
    title: "is_active",
    field: "is_active",
    width: "24%",
    inputProps: {
      inputType: "checkbox",
    },
  },
  {
    title: "parent_order",
    field: "parent_order",
    width: "24%",
    inputProps: {
      inputType: "number",
      min: 0,
    },
  },
];
