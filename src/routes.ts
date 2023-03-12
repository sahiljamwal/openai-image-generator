import express, { Request, Response } from "express";
import OpenAiController from "./controllers/openai.controllers";
import { validateGenerateImagePayload } from "./middlewares/validator.middlewares";

const apiRouter = express.Router();

apiRouter.get("/health", (_req: Request, res: Response) => res.sendStatus(200));
apiRouter.post(
  "/generateimage",
  validateGenerateImagePayload,
  new OpenAiController().generateImage
);

export default apiRouter;
