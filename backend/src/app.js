import dotenv from "dotenv";
import { app } from "./main.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env.local",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error", error);
      throw error;
    });
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1);
  });