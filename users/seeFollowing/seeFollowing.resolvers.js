import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true }, //select를 사용하지않으면 유저정보 전체를 가져오기때문에 id의 정보만을 가져오기위해서는 select: { id: true }를 사용해준다.
      });
      if (!ok) {
        return {
          ok: false,
          error: "Cant find User",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        following,
      };
    },
  },
};
