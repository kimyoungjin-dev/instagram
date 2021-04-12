import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client }) => {
      const likes = await client.like.findMany({
        //사진의 아이디 == 인자로 받은 아이디
        where: { photoId: id },
        select: { user: true },
      });

      return likes.map((item) => item.user);
    },
  },
};

export default resolvers;
