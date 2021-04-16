const express = require("express");
const { Client } = require("pg");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const DB_URI = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080;

const app = express();
const client = new Client({
  connectionString: DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Home Page",
  });
});

app.listen(PORT, () => {
  console.log(`server up on port ${PORT}`);
});
