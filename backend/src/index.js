import dotenv from "dotenv";
import express from "express";

dotenv.config({
  path: ".env.local",
});

const app = express() || 8080;

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
