import { IWeatherClient, WeatherParameters } from "../@types/IWeatherClient";

export default (weatherClient: IWeatherClient) =>
  async (_: any, args: WeatherParameters) => {
    const forecast = await weatherClient.forecast(args);

    return forecast;
  };
