import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: async (_, { hashtag }, { client }) =>
      await client.hashtag.findUnique({
        where: { hashtag },
      }),
  },
};

export default resolvers;
