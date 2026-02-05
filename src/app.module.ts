import { Application } from "express";

export default (app: Application) => {
     app.use("/api/v1/auth", require("./Module/auth/auth.module").default);
};
