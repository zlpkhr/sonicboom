import express from "express";
import cors from "cors";
import { httpLogger, logger } from "./logger.ts";
import { port } from "./app.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use(httpLogger);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(port, (err) => {
  if (err) {
    logger.error("Failed to start server", { error: err.message });
    process.exit(1);
  }

  logger.info("Server started", { port });
});
