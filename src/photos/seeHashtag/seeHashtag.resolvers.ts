import { Resolvers } from "../../types";

//누구나 사용할수있는 resolver 이기때문에 "protect"로 만들지않아도된다.
const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};

export default resolvers;

//해당 해시태그에 등록된 사진배열 && 등록된 사진들의 총갯수
