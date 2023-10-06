import { ApolloError } from "apollo-server";
import UserModel from "../schema/userModel";

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await UserModel.find();
      } catch (error) {
        throw new ApolloError("Internal Server Error", "INTERNAL_SERVER_ERROR");
      }
    },
    user: async (_, args) => {
      try {
        return await UserModel.findById(args.userId);
      } catch (error) {
        throw new ApolloError("Internal Server Error", "INTERNAL_SERVER_ERROR");
      }
    },
  },
};

export default resolvers;
