import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { koaMiddleware } from "@as-integrations/koa";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    numberSix: Int
    numberSeven: Int
  }
  
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
  },
};

const app = new Koa();
const httpServer = http.createServer(app.callback());

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(cors());
app.use(bodyParser());
app.use(
  koaMiddleware(server, {
    context: async ({ ctx }) => ({ token: ctx.headers.token }),
  })
);

await new Promise((resolve: any) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);
