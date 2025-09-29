import express from "express";
import cors from "cors";
import { httpLogger } from "./logger.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use(httpLogger);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(3000);
