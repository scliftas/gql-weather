import { gql } from "apollo-server";

const typeDefs = gql`
  type Coord {
    lat: Float!
    lon: Float!
  }

  type Weather {
    id: Int!
    main: String!
    description: String!
    icon: String!
  }

  type Main {
    temp: Float!
    feels_like: Float!
    temp_min: Float!
    temp_max: Float!
    pressure: Int!
    humidity: Int!
  }

  type Wind {
    speed: Float!
    deg: Float!
  }

  type Clouds {
    all: Int!
  }

  type Sys {
    type: Int!
    id: Int!
    message: Float
    country: String!
    sunrise: Int!
    sunset: Int!
  }

  type City {
    id: Int!
    name: String!
    coord: Coord!
    country: String!
    population: Int!
    timezone: Int!
    sunrise: Int!
    sunset: Int!
  }

  type ForecastSys {
    pod: String!
  }

  type Forecast {
    dt: Int!
    main: Main!
    weather: [Weather!]!
    clouds: Clouds!
    wind: Wind!
    visibility: Int!
    pop: Float!
    sys: ForecastSys!
    dt_txt: String!
  }

  type WeatherResponse {
    coord: Coord!
    weather: [Weather!]!
    base: String!
    main: Main!
    visibility: Int!
    wind: Wind!
    clouds: Clouds!
    dt: Int!
    sys: Sys!
    timezone: Int!
    id: Int!
    name: String!
    cod: Int!
  }

  type ForecastResponse {
    cod: String!
    message: Float!
    cnt: Int!
    list: [Forecast!]!
    city: City!
  }

  enum Units {
    standard
    metric
    imperial
  }

  type Query {
    current(
      q: String
      lat: Float
      lon: Float
      units: Units
      lang: String
    ): WeatherResponse!
    forecast(
      q: String
      lat: Float
      lon: Float
      units: Units
      lang: String
    ): ForecastResponse!
  }
`;

export default typeDefs;
