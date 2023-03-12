# OpenAI Image Generator

This is a simple image generator built with Node.js and Express that uses [OpenAI's Dall-E models](https://beta.openai.com/docs/guides/images) to generate images.

## Usage

- create a `.env` file
- Generate an API KEY at [OpenAi](https://platform.openai.com/) and add it to the .env file as `OPEN_API_KEY`.
- run `npm i` to install dependencies
- run `npm run build` to build the project
- finally, run `npm start` to start the project

Visit `http://localhost:3000` in your browser.

The endpoint is at `POST http://localhost:5000/openai/generateimage`.
