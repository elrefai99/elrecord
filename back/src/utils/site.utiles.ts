import express, { Application, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { limiter } from "./Guards/limitRequest/site.limit.utils";

export default (app: Application) => {
  const allowedOrigins = ["http://localhost:5173", "https://egystay.lesoll-demo.site", 'http://127.0.0.1:5500'];
  const corsOptions = {
    origin: (origin: any, callback: any) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessState: 200,
  };

  app.use(helmet());
  app.use(express.json({
    limit: "100mb"
  }));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use("/v0/public", express.static("cdn"));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
  app.set("trust proxy", true);
  app.use(async (req: Request | any, _res, next) => {
    const lang = req.headers['accept-language'];
    req.lang = (lang === 'ar' || lang === 'en') ? lang : 'en';
    next();
  });
  app.use(limiter);
};
