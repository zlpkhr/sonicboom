import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Ok");
});

app.listen(3000);
