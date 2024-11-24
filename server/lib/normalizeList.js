const normalizeList = (list, keyField, valueField, includeOtherValues) => {
  return list.map((item) => ({
    label: item[valueField],
    value: item[keyField],
    ...(includeOtherValues ? item : null),
  }));
};

module.exports = normalizeList;
