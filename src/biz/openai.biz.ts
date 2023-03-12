import { Request } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env[`OPEN_API_KEY`],
});

export default class OpenAiBiz {
  private _openai = new OpenAIApi(configuration);

  generateImage = async (request: Request) => {
    try {
      const { prompt, size } = request.body;

      const imageSize =
        size === "small"
          ? "256x256"
          : size === "medium"
          ? "512x512"
          : "1024x1024";

      try {
        const response = await this._openai.createImage({
          prompt,
          size: imageSize,
          n: 1,
        });

        const imageUrl = response.data.data[0].url;
        return imageUrl;
      } catch (err) {
        if ((err as any).response) {
          console.error((err as any).response.status);
          console.error((err as any).response.data);
        } else {
          console.error((err as any).message);
        }

        throw err;
      }
    } catch (err) {
      throw err;
    }
  };
}
