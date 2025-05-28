import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { limiter } from "./Guards/limitRequest/site.limit.utils";
import PromClient from 'prom-client'

const register = new PromClient.Registry();
PromClient.collectDefaultMetrics({ register });

const totalRequests = new PromClient.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
})
register.registerMetric(totalRequests);

// Histogram: HTTP request duration
const httpRequestDuration = new PromClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});
register.registerMetric(httpRequestDuration);

// Gauge: active requests count
const activeRequests = new PromClient.Gauge({
  name: "active_requests",
  help: "Number of active HTTP requests",
});

register.registerMetric(activeRequests);
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
  app.use(async (req: Request | any, res: Response, next: NextFunction) => {
    // get langouage of headers
    const lang = req.headers['accept-language'];
    req.lang = (lang === 'ar' || lang === 'en') ? lang : 'en';

    // ip address of users
    const clientIP = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    req.clientIP = clientIP;

    if (req.path === "/metrics") {
      return next();
    }
    activeRequests.inc();
    const end = httpRequestDuration.startTimer();

    res.on("finish", () => {
      activeRequests.dec();
      totalRequests
        .labels(req.method, req.path, res.statusCode.toString())
        .inc();
      end({
        method: req.method,
        route: req.path,
        status: res.statusCode.toString(),
      });
    });
    next();
  });
  app.use(limiter);
};
