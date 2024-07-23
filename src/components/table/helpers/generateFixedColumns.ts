import calculateCellWidth from "./calculateCellWidth";

const generateFixedColumns = ({
  containerWidthNumber,
  columnsFromProps,
}: {
  containerWidthNumber: number;
  columnsFromProps: {
    width?: string;
    title?: string;
    dataIndex: string;
    className?: string;
  }[];
}) => {
  if (!columnsFromProps?.length) {
    return { adjustedColumns: [] };
  }

  const adjustedColumns = columnsFromProps.map(
    ({ width, title, ...column }) => ({
      ...column,
      title,
      width: calculateCellWidth(containerWidthNumber, width || 200),
    })
  );

  return { adjustedColumns };
};

export default generateFixedColumns;
