import { Resolvers } from "../../types";

const resovers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
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
export default resovers;
