import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";
import { getUserFromToken } from "./utils/auth";
import { expressMiddleware } from "@as-integrations/express4";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const userId = getUserFromToken(token);

        return { userId };
      },
    })
  );

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();
