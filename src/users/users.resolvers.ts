import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    // 아이디는 "영진"의 아이디이다.

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
      } else {
        return id === loggedInUser.id;
      }
    },

    //플레이그라운드의 username 을 프로필을 보고있다 => 이사람이 나와 팔로윙이 되어있는지를 체크하는 함수
    isFollowing: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const followerCount = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: { id },
          },
        },
      });
      //만약 followerCount이 0보다 크다면 true 를 return 한다.
      return Boolean(followerCount);
    },

    photos: ({ id }, _, { client }) =>
      client.user.findUnique({ where: { id } }).photos(),
  },
};
export default resolvers;
