import express from "express";
import { httpLogger } from "./logger.ts";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000);
