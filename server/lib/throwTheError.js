const throwTheError = (error, res) => {
  console.error(error);
  res.status(500).json({ error: error });
};

module.exports = throwTheError;
