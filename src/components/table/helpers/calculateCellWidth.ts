const calculateCellWidth = (totalWidth: number, cellWidth: string | number) => {
  if (!cellWidth) return undefined;

  const width = cellWidth.toString().replace(/\s/g, "");
  //@ts-ignore
  if (!isNaN(width)) return +width;

  const percentage = parseFloat(width);
  return (percentage / 100) * totalWidth;
};

export default calculateCellWidth;
