import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  //photo의 다양한 caption 에서 keyword로 검색해서 찾는다
  Query: {
    searchPhotos: (_, { keyword }, { client }) =>
      client.photo.findMany({
        where: { caption: { startsWith: keyword } },
      }),
  },
};

export default resolvers;
