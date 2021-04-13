import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      //exist user check!
      const checkUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      console.log(checkUser);
      if (!checkUser) {
        return {
          ok: false,
          error: "Cant find User",
        };
      }

      const followers = await client.user
        .findUnique({
          where: {
            username,
          },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};

export default resolvers;
