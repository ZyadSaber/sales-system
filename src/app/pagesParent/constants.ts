export const columns = [
  {
    title: "ID",
    dataIndex: "page_parent_id",
    width: "10%",
  },
  {
    title: "Parent Name",
    dataIndex: "page_parent_name",
    width: "70%",
    inputProps: {
      type: "text",
      placeHolder: "page name",
    },
  },
  {
    title: "Hidden",
    dataIndex: "hidden",
    width: "10%",
    inputProps: {
      type: "checkBox",
    },
  },
  {
    title: "Index",
    dataIndex: "page_parent_index",
    width: "10%",
    inputProps: {
      type: "number",
    },
  },
];
