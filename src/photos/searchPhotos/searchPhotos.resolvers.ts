import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: async (_, { keyword, page }, { client }) => {
      const searchPhoto = await client.photo.findMany({
        where: { caption: { contains: keyword.toLowerCase() } },
        take: 5,
        skip: (page - 1) * 5,
      });

      const totalPhoto = await client.photo.count({
        where: { caption: { contains: keyword.toLowerCase() } },
      });

      return {
        ok: true,
        searchPhoto,
        totalPhoto,
        totalPages: Math.ceil(totalPhoto / 5),
      };
    },
  },
};

export default resolvers;
