import express from "express";
// import mongoDB from "./db/index.js";
import cors from 'cors'
// import mongoose from 'mongoose'
import { badRequest, notFound, unauthorized, genericError } from "./errorHandlers.js";
import listEndpoints from 'express-list-endpoints'
import accomodationRouter from "./services/accomodation/index.js";



const port = 3001 || process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors())

app.get("/test", (req, res) => {
    res.status(200).send({ message: "Test success!" })
})
app.use('/accomodation', accomodationRouter)


app.use(badRequest);
app.use(notFound);
app.use(unauthorized)
app.use(genericError);

console.table(listEndpoints(app))

// app.listen(port, mongoDB(), () =>
//   console.log(`Example app listening on port port!`)
// );

// mongoose
//   .connect(process.env.MONGO_CONNECTION + 'prd', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(
//     app.listen(port, () => {
//       console.log("Running on port", port);
//     })
//   )
//   .catch((err) => console.log(err));

export default app
