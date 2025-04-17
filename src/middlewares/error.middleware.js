import { config } from "../config/index.js";

export const errorMiddleware = (err, req, res, next) => {
  if (config.nodeEnv === "development") {
    res.send(err.message);

  
  } else if (config.nodeEnv === "production") {
    res.status(500).send("internal server error");

  } else {
    res.send(err.message);
  }
};
