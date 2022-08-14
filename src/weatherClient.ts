import axios from "axios";
import {
  IWeatherClient,
  ForecastParameters,
  ForecastResponse,
  WeatherParameters,
  WeatherResponse,
} from "./@types/IWeatherClient";

export default class Weather implements IWeatherClient {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async doRequest(endpoint: string, reqParams: WeatherParameters) {
    const params = reqParams;
    params.appid = this.apiKey;

    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/${endpoint}`,
        {
          params,
        }
      );

      return result.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async current(args: WeatherParameters): Promise<WeatherResponse> {
    const result = await this.doRequest("weather", args);

    return result;
  }

  async forecast(args: ForecastParameters): Promise<ForecastResponse> {
    const result = await this.doRequest("forecast", args);

    return result;
  }
}
