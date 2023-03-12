import express, { json, Request, Response, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
config();
import helmet from "helmet";
import compression from "compression";
import apiRouter from "./routes";
import path from "path";

const app = express();

app.use(helmet());
app.use(
  compression({
    filter: (req: Request, res: Response) =>
      req.headers["x-no-compression"] ? false : compression.filter(req, res),
  })
);
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

// API entrypoint
app.use("/openai", apiRouter);

export default app;
