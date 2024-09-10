// var { graphql, buildSchema } = require("graphql");

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var rootValue = { hello: () => "Hello world!" };

// var source = "{ hello }";

// graphql({ schema, source, rootValue }).then((response) => {
//   console.log(response);
// });

/**
 * 分割线============================
 */

const express = require("express"); // yarn add express
const { createHandler } = require("graphql-http/lib/use/express");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
} = require("graphql");

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    name: { type: GraphQLString },
    bestFriend: { type: PersonType },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
      weight: {
        type: GraphQLInt,
        resolve: () => 16,
      },
      age: {
        type: GraphQLFloat,
        resolve: () => {
          return 18.18;
        },
      },
      person: {
        type: PersonType,
        resolve: () => {
          return {
            name: "张三",
          };
        },
      },
    },
  }),
});

// Create an express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express();
app.all("/graphql", createHandler({ schema }));

app.listen({ port: 4000 });
console.log("Listening to port 4000");
