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

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser, client }) => {
      console.log(id, loggedInUser.username);
      if (!loggedInUser) {
        return false;
      }
      //  seeProfile(username:"sanghee") => "상희"의 프로필을 보고 =>기준을 정한다(username=영진) =>"영진" following 목록에 "상희"의 id가있는지 체크한다.
      const exist = await client.user.count({
        where: { username: loggedInUser.username, following: { some: { id } } },
      });
      return Boolean(exist);
    },

    photos: ({ id }, _, { client }) =>
      client.user.findUnique({ where: { id } }).photos(),
  },
};
export default resolvers;
