import { ApolloServer } from "apollo-server";
import { IWeatherClient } from "./@types/IWeatherClient";
import current from "./resolvers/current";
import forecast from "./resolvers/forecast";
import typeDefs from "./typeDefs";

export const createServer = (weatherClient: IWeatherClient) => {
  const resolvers = {
    Query: {
      current: current(weatherClient),
      forecast: forecast(weatherClient),
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
  });

  return server;
};
