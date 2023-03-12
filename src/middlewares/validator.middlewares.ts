import { NextFunction, Request, Response } from "express";
import joi from "joi";

export const validateGenerateImagePayload = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const schema = joi.object().keys({
      prompt: joi.string().required(),
      size: joi
        .string()
        .lowercase()
        .default("medium")
        .allow("small", "medium", "large")
        .optional(),
    });

    request.body = await schema.validateAsync(request.body, {
      stripUnknown: true,
    });

    return next();
  } catch (err) {
    console.error(err);
    return response
      .status(400)
      .send({ success: false, error: (err as Error).message });
  }
};
