import express from "express";
import mongoose from "mongoose";
import accomodationRouter from "./services/accomodation/index.js";

const port = 3001 || process.env.PORT;

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION);

app.use(express.json());
app.use("/accomodation", accomodationRouter);

app.listen(port, () => console.log(`listening on port ${port} !`));
