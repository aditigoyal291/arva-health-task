// app.js

import dotenv from "dotenv";
// require("dotenv").config();
dotenv.config();
import express from "express";
const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
