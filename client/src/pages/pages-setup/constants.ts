export const tableColumns = [
  {
    title: "page_id",
    field: "page_id",
    width: "7%",
  },
  {
    title: "page_name",
    field: "page_name",
    width: "25%",
    inputProps: {
      inputType: "text",
    },
  },
  {
    title: "page_path",
    field: "page_path",
    width: "25%",
    inputProps: {
      inputType: "text",
    },
  },
  {
    title: "is_active",
    field: "is_active",
    width: "5%",
    inputProps: {
      inputType: "checkbox",
    },
  },
  {
    title: "parent_id",
    field: "parent_id",
    width: "24%",
    inputProps: {
      inputType: "selectWithApi",
      apiId: "GET_PAGE_PARENT_LISt",
    },
  },
];
