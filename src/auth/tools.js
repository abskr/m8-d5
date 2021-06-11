import jwt from "jsonwebtoken";
import users from "../services/users/schema.js";

export const authenticate = async (users) => {
  const newAccesToken = await generateJWT({ _id: users._id, role: users.role });
  const newRefreshToken = await generateRefreshJWT({ _id: users._id });

  users.refreshToken = newRefreshToken;
  await users.save();
  return { token: newAccesToken, refreshToken: newRefreshToken };
};

const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRECT,
      { expiresIn: "1 day" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    )
  );
export const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRECT, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    })
  );
const generateRefreshJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err);
        res(token);
      }
    )
  );

export const verifyRefreshToken = (token) => {
  new Promise((res, rej) =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    })
  );
};

export const refreshToken = async (oldRefreshToken) => {
  const decoded = await verifyRefreshToken(oldRefreshToken);
  const user = await users.findOne({ _id: decoded._id });

  if (!user) {
    throw new Error("Not Access");
  }

  const curretRefreshToken = user.refreshToken;

  if (curretRefreshToken !== oldRefreshToken) {
    throw new Error("Refresh token is wrong");
  }

  const newAccessToken = await generateJWT({ _id: user._id });
  const newRefreshToken = await generateRefreshJWT({ _id: user._id });

  user.refreshToken = newRefreshToken;

  await user.save();
  return { token: newAccessToken, refreshToken: newRefreshToken };
};
