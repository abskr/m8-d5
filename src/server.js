import express from "express";
import mongoDB from "./db/index.js";
import accomodationRouter from "./services/accomodation/index.js";

const port = 3001 || process.env.PORT;

const app = express();

app.use(express.json());

app.use("/accomodation", accomodationRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, mongoDB(), () =>
  console.log(`Example app listening on port port!`)
);
