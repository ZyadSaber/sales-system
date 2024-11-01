const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 5000;

app.use(logger);
// app.use(express.urlencoded({ extends: false }));
app.use(express.json());

const whiteList = [
  process.env.domain,
  "http://127.0.0.1:5000/",
  "http://localhost:5000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
