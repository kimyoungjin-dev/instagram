import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => {
      //findMany를 이용하여, 다수의 사용자를 검색 => startsWith함수를 사용해준다.
      const searchUser = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      return {
        ok: true,
        searchUser,
      };
    },
  },
};
