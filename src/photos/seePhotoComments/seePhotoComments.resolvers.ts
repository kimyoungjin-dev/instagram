import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    //선택한 사진의 모든 comments를 가지고온다
    seePhotoComments: (_, { id, lastId }, { client }) =>
      //comment 필드에서 찾는다. photoId 가 예를 들어 1이면, => 1과일치하는 comment들만 보여준다
      client.comment.findMany({
        where: { photoId: id },

        //pagination 사용
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),

        //오름차순 정렬
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
export default resolvers;
