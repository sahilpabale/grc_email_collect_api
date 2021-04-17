const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const DB_URI = process.env.DATABASE_URL;
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/signup", async (req, res) => {
  try {
    const { email_id } = req.body;

    if (!email_id) {
      return res.status(404).json({
        status: "failed",
        code: "100",
        message: "No email id in body.",
      });
    }

    const emailCheck = await client.query(
      "SELECT 1 FROM signup_list WHERE email_id = $1",
      [email_id],
    );

    if (emailCheck.rows.length) {
      return res.status(404).json({
        status: "failed",
        code: "200",
        message: "Email already exists.",
      });
    }

    const result = await client.query(
      `INSERT INTO signup_list (email_id) VALUES ($1) RETURNING email_id;`,
      [email_id],
    );

    const email = result.rows[0].email_id;

    res.status(200).json({
      status: "success",
      code: "300",
      data: { email_id: email },
      message: `${email} successfully signed up.`,
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`server up on port ${PORT}`);
});
