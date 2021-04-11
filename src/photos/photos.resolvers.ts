import { Resolvers } from "../types";

//computied fields 를 작성할때에는 root를 명시해주어야한다.
const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    //user의 id : Photo :userId

    //해쉬테그를 찾는다. 찾은 사진의 id를 가지고있는 hash tag이다. , photos해시태그들 내에서 찾는다. =>
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },
};

export default resolvers;
