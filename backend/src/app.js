import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
morgan.token("host", function (req, res) {
  return req.hostname;
});
app.use(
  morgan(":method :host :status :res[content-length] - :response-time ms")
);
// app.use(morgan("tiny"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// router imports
import userRouter from "./routes/user.routes.js";

// route declaration
app.use("/api/v1/users", userRouter);

export { app };
