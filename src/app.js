import express from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";


import { appRouter } from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/api/v1", appRouter);


app.use(errorMiddleware)

export default app;