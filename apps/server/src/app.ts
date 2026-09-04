import express, { type Express } from "express";
import { pinoHttp } from "pino-http";
import "dotenv/config";
import router from "#routes/routes.js";
import logErrors from "#errors/logErrors.js";
import { randomUUID } from "node:crypto";

const PORT = process.env.PORT || 3000;
const app: Express = express();
const logger = pinoHttp({
  transport: {
    target: "pino-pretty",

    options: {
      colorize: true,
    },
  },
  quietReqLogger: true,
  genReqId(req) {
    return req.headers["x-request-id"] || randomUUID();
  },
});

app.use(logger);
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    throw new Error("Something went wrong");
  }
  console.log("Now listening on port:", PORT);
});

app.use(logErrors);
