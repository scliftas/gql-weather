import { IWeatherClient, WeatherParameters } from "../@types/IWeatherClient";

export default (weatherClient: IWeatherClient) =>
  async (_: any, args: WeatherParameters) => {
    const weather = await weatherClient.current(args);

    return weather;
  };
