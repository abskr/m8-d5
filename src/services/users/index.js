import express from "express";
import UsersModel from "./schema.js";
import { authenticate } from "../../auth/tools.js";
import { hostOnlyMiddleware, JwtAuthMiddleware } from "../../auth/index.js";

const usersRouter = express.Router();

usersRouter.get("/me", async (req, res, next) => {
  try {
    const users = await UsersModel.find();

    if (users) {
      res.send(users);
    } else {
      res.status(404).send("No users yet!");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUsers = new UsersModel(req.body);
    const { _id } = await newUsers.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    next(error);
  }
});
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.checkCredentials(email, password);
    const tokens = await authenticate(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});
usersRouter.get(
  "/me/accommodation",
  JwtAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      res.send(req.users);
    } catch (error) {
      next(error);
    }
  }
);
usersRouter.get("/:Id", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const accomodation = await UsersModel.findById(id);
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

usersRouter.put("/:Id", async (req, res, next) => {
  try {
    const accomodation = await UsersModel.findByIdAndUpdate(
      req.params.Id,
      req.body,
      { runValidators: true, new: true }
    );
    if (accomodation) {
      res.send(`${req.params.Id} is updated!`);
    } else {
      const error = new Error(`${req.params.Id} is not found!`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:Id", async (req, res, next) => {
  try {
    const accomodation = await UsersModel.findByIdAndDelete(req.params.Id);
    if (accomodation) {
      res.send(`item ${req.params.Id} is deleted.`);
    } else {
      res.send(404).send(`Accomodation ${req.params.Id} is not found!`);
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
