import express, { type Express } from "express";
import { pinoHttp } from "pino-http";
import "dotenv/config";
import router from "./routes/routes.js";
import logErrors from "./middleware/logErrors.js";
import { randomUUID } from "node:crypto";
import methodOverride from "method-override";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import helmet from "helmet";

const PORT = process.env.PORT || 3000;
const app: Express = express();
const logger = pinoHttp({
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",

          options: {
            colorize: true,
          },
        }
      : undefined,
  quietReqLogger: true,
  genReqId(req) {
    return req.headers["x-request-id"] || randomUUID();
  },
});

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [];
app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride()); //use to over-ride client verbs
app.disable("x-powered-by");
// app.use(helmet());

app.use(logger);
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    throw new Error("Something went wrong");
  }
  console.log("Now listening on port:", PORT);
});

app.use(logErrors);
app.use(errorHandler);

export default app;
