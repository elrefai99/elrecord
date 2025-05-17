import jwt from "jsonwebtoken";

export const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
export const PENDING_SECRET_KEY = process.env.PENDING_TOKEN_SECRET as string;

export const accountToken = (id: any, vToken: any) => {
  return jwt.sign({ _id: id, vToken }, SECRET_KEY, { expiresIn: "1d", });
};

export const PendingToken = (id: any, vToken: any) => {
  return jwt.sign({ _id: id, vToken }, PENDING_SECRET_KEY, { expiresIn: "12h", });
};
