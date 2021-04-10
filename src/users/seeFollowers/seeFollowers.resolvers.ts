import { Resolvers } from "../../types";
//user의 follower 목록을 확인
const resovers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      //page는 필수값
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      //만약 username을 찾지못하였다면, false를 리턴
      if (!ok) {
        return {
          ok: false,
          error: "Cant find user",
        };
      }

      //다른 유저의 팔로윙 목록중 username(영진)을 찾는다.
      const followers = await client.user
        .findUnique({
          where: { username },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5), //Math.ceil은 무조건 올림해준다.
      };
    },
  },
};
export default resovers;
