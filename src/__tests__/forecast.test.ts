import { createServer } from "../server";
import {
  IWeatherClient,
  ForecastParameters,
  ForecastResponse,
  WeatherParameters,
} from "../@types/IWeatherClient";

const mockForecast: ForecastResponse = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1647345600,
      main: {
        temp: 286.88,
        feels_like: 285.93,
        temp_min: 286.74,
        temp_max: 286.88,
        pressure: 1021,
        humidity: 62,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: {
        all: 85,
      },
      wind: {
        speed: 3.25,
        deg: 134,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2022-03-15 12:00:00",
    },
    {
      dt: 1647356400,
      main: {
        temp: 286.71,
        feels_like: 285.77,
        temp_min: 286.38,
        temp_max: 286.71,
        pressure: 1021,
        humidity: 63,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: {
        all: 90,
      },
      wind: {
        speed: 3.34,
        deg: 172,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2022-03-15 15:00:00",
    },
  ],
  city: {
    id: 2643743,
    name: "London",
    coord: {
      lat: 51.5073,
      lon: -0.1277,
    },
    country: "GB",
    population: 1000000,
    timezone: 0,
    sunrise: 1647324903,
    sunset: 1647367441,
  },
};

class MockWeatherClient implements IWeatherClient {
  apiKey: string;

  current(_: WeatherParameters) {
    return Promise.resolve(null);
  }

  forecast(_: ForecastParameters) {
    return Promise.resolve(mockForecast);
  }
}

test("forecast query returns forecast from the weather api", async () => {
  const weatherClient = new MockWeatherClient();
  const server = createServer(weatherClient);

  const result = await server.executeOperation({
    query: `query Query($q: String) {
      forecast(q: $q) {
        cod
        message
        cnt
        list {
          clouds {
            all
          }
          dt
          main {
            temp
            feels_like
            temp_min
            temp_max
            pressure
            humidity
          }
          sys {
            pod
          }
          visibility
          weather {
            id
            main
            description
            icon
          }
          wind {
            speed
            deg
          }
          dt_txt
          pop
        }
        city {
          id
          name
          coord {
            lat
            lon
          }
          country
          population
          timezone
          sunrise
          sunset
        }
      }
    }`,
    variables: {
      q: "Mountain View",
    },
  });

  expect(result.data).toEqual({ forecast: mockForecast });
});
