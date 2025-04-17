import app from "./app.js";
import { config } from "./config/index.js";
import { connectionDB } from "./db/index.js";
import dotenv from "dotenv"
dotenv.config()

function bootstrap() {
  try {
    connectionDB();
    app.listen(config.api.port, () => {
      console.log(`Server running on port ${config.api.port}`);
    });
  } catch (e) {
    console.log("Exit: ", e.message);
    process.exit(1);
  }
}

bootstrap();
