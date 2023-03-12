import { Request, Response } from "express";
import OpenAiBiz from "../biz/openai.biz";

export default class OpenAiController {
  private _openAiBizObj = new OpenAiBiz();

  generateImage = async (request: Request, response: Response) => {
    try {
      const imageUrl = await this._openAiBizObj.generateImage(request);
      return response.status(200).send({ success: true, imageUrl });
    } catch (err) {
      //   console.error(err);
      return response
        .status(500)
        .json({ success: false, error: "The image could not be generated" });
    }
  };
}
