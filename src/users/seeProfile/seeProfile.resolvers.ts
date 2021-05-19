import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { client }) =>
      await client.user.findUnique({
        where: { username },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};

export default resolvers;
