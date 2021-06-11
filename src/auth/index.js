import { error } from "express-openapi-validator";
import UsersModel from "../services/users/schema.js";
import { verifyJWT } from "./tools.js";

export const JwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = await verifyJWT(token);
    const users = await UsersModel.findOne({
      _id: decode._id,
    });
    if (!users) {
      throw new Error();
    }

    req.users = users;
    next();
  } catch (err) {
    const error = new Error("Please authenticate");
    error.httpStatusCode = 401;
    next(error);
  }
};

export const hostOnlyMiddleware = async (req, res, next) => {
  if (req.users && req.users.role === "Host") next();
  else {
    const err = new Error("Only for admins!");
    err.httpStatusCode = 403;
    next(error);
  }
};
