import cors from "cors";
import express from "express";
import { port } from "./app.ts";
import { makeHttpLogger } from "./logging/http.ts";
import { logger } from "./logging/logger.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use(makeHttpLogger(logger));

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
