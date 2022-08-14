import dotenv from "dotenv";
import WeatherClient from "./weatherClient";
import { createServer } from "./server";

dotenv.config();

const weatherClient = new WeatherClient(process.env.WEATHER_API_KEY);

createServer(weatherClient)
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
