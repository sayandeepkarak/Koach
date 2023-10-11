import express from "express";
import { DB_URL, PORT } from "./config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import connectDatabase from "./config/db";
import errorHandler from "./middleware/errorHandler";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";

(async () => {
  const graphqlServer = new ApolloServer({ typeDefs, resolvers });
  await graphqlServer.start();
  const app = express();

  app.use(express.json());
  app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/user", userRoute);
  app.use("/api/auth", authRoute);
  app.use(
    "/koach-graph",
    /*verifyAccessKey,*/ expressMiddleware(graphqlServer)
  );
  app.use("/", express.static("./client/dist/"));
  app.use("/uploads", express.static("./upload/"));
  app.use(errorHandler);

  await connectDatabase(DB_URL);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
