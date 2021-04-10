import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    //아이디는 "영진"의 아이디이다.
    totalFollowing: ({ id }, _, { client }) =>
      client.user.count({
        where: { followers: { some: { id } } },
      }),

    totalFollowers: ({ id }, _, { client }) =>
      client.user.count({
        where: { following: { some: { id } } },
      }),

    isMe: ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      const exist = await client.user.count({
        where: { username: loggedInUser.username, following: { some: { id } } },
      });
      return Boolean(exist);
    },
  },
};
export default resolvers;
