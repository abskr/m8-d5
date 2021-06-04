import express from "express";
import AccomodationModel from "./schema.js";

const accomodationRouter = express.Router();

accomodationRouter.get("/", async (req, res, next) => {
  try {
    const accomodations = await AccomodationModel.find();
    if (accomodations) {
      res.send(accomodations);
    } else {
      console.log("something went wrog");
    }
  } catch (error) {
    next(error);
  }
});

accomodationRouter.post("/", async (req, res, next) => {
  try {
    const newAccomodation = new AccomodationModel(req.body);
    const { _id } = await newAccomodation.save();
    res.status(201).send(`Accomodation is saved with id: ${_id}`);
  } catch (error) {
    next(error);
  }
});

accomodationRouter.get("/:accoId", async (req, res, next) => {
  try {
    const id = req.params.accoId;
    const accomodation = await AccomodationModel.findById(id);
    if (accomodation) {
      res.send(accomodation);
    } else {
      const error = new Error("No accomodation found!");
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

accomodationRouter.put("/:accoId", async (req, res, next) => {
  try {
    const accomodation = await AccomodationModel.findByIdAndUpdate(
      req.params.accoId,
      req.body,
      { runValidators: true, new: true }
    );
  } catch (error) {
    next(error);
  }
});

accomodationRouter.delete("/:accoId", async (req, res, next) => {
  try {
    const accomodation = await AccomodationModel.findByIdAndDelete(
      req.params.accoId
    );
    if (accomodation) {
      res.send(`item ${req.params.accoId} is deleted.`);
    } else {
      res.send(404).send(`Accomodation ${req.params.accoId} is not found!`);
    }
  } catch (error) {
    next(error);
  }
});

export default accomodationRouter;
