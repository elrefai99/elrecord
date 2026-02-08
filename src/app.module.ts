import { Application } from "express";

export default (app: Application) => {
     app.use("/api/v1/auth", require("./Module/auth/auth.module").default);
     app.use("/api/v1/otp", require("./Module/otp/otp.module").default);
     app.use("/api/v1/user", require("./Module/user/user.module").default);
};
