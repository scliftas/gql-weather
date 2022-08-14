import { createServer } from "../server";
import {
  IWeatherClient,
  WeatherParameters,
  WeatherResponse,
} from "../@types/IWeatherClient";

const mockWeather: WeatherResponse = {
  coord: {
    lon: -122.08,
    lat: 37.39,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 282.55,
    feels_like: 281.86,
    temp_min: 280.37,
    temp_max: 284.26,
    pressure: 1023,
    humidity: 100,
  },
  visibility: 10000,
  wind: {
    speed: 1.5,
    deg: 350,
  },
  clouds: {
    all: 1,
  },
  dt: 1560350645,
  sys: {
    type: 1,
    id: 5122,
    message: 0.0139,
    country: "US",
    sunrise: 1560343627,
    sunset: 1560396563,
  },
  timezone: -25200,
  id: 420006353,
  name: "Mountain View",
  cod: 200,
};

class MockWeatherClient implements IWeatherClient {
  apiKey: string;

  current(_: WeatherParameters) {
    return Promise.resolve(mockWeather);
  }

  forecast(_: WeatherParameters) {
    return Promise.resolve(null);
  }
}

test("current query returns current weather from the weather api", async () => {
  const weatherClient = new MockWeatherClient();
  const server = createServer(weatherClient);

  const result = await server.executeOperation({
    query: `query Query($q: String!) {
      current(q: $q) {
        coord {
          lat
          lon
        }
        weather {
          id
          main
          description
          icon
        }
        base
        main {
          temp
          feels_like
          temp_min
          temp_max
          pressure
          humidity
        }
        visibility
        wind {
          speed
          deg
        }
        clouds {
          all
        }
        dt
        sys {
          type
          id
          message
          country
          sunrise
          sunset
        }
        timezone
        id
        name
        cod
      }
    }`,
    variables: {
      q: "Mountain View",
    },
  });

  expect(result.data).toEqual({ current: mockWeather });
});
