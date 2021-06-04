import express from "express";
import mongoDB from "./db/index.js";

const port = 3001 || process.env.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, mongoDB(), () =>
  console.log(`Example app listening on port port!`)
);
