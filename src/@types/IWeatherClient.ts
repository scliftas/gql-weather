type Coord = {
  lat: number;
  lon: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type Units = "standard" | "metric" | "imperial";

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type ForecastSys = {
  pod: string;
};

type Forecast = {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: ForecastSys;
  dt_txt: string;
};

export type WeatherParameters = {
  q?: string;
  lat?: number;
  lon?: number;
  appid?: string;
  units?: Units;
  lang?: string;
};

export type WeatherResponse = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type ForecastParameters = {
  q?: string;
  lat?: number;
  lon?: number;
  appid?: string;
  units?: Units;
  lang?: string;
};

export type ForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: City;
};

export interface IWeatherClient {
  apiKey: string;
  current(args: WeatherParameters): Promise<WeatherResponse>;
  forecast(args: ForecastParameters): Promise<ForecastResponse>;
}
