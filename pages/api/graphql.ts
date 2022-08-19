import { NextApiRequest, NextApiResponse } from "next";

import { ApolloServer } from "apollo-server-micro";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { resolvers, typeDefs } from "../../graphql";

import { createContext } from "../../graphql/context";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
