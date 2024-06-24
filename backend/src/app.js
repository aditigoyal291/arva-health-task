import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

morgan.token("host", function (req, res) {
  return req.hostname;
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// app.use(morgan(":method :host :status :res[content-length] - :response-time ms"));
app.use(morgan("tiny"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// router imports
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import productRouter from "./routes/product.routes.js";

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/product", productRouter);

export { app };
