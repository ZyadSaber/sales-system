const normalizeTableResponse = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      record_status: "q",
    }));
  }
  return data;
};

module.exports = normalizeTableResponse;
