import { Resolvers } from "../types";

//computied fields 를 작성할때에는 root를 명시해주어야한다.
const resolvers: Resolvers = {
  //photo 를 위한 resolver
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    //user의 id : Photo :userId

    //해쉬테그를 찾는다. 찾은 사진의 id를 가지고있는 hash tag이다. , photos해시태그들 내에서 찾는다. =>
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },

  //hashtag 를 위한 resolver
  //root는 우리가 찾는 사진 =>
  Hashtag: {
    //해당 해쉬테그에 해당하는 모든 사진을 불러올수있다. //하지만 사진이 많이존재한다면, 데이터베이스에 과부하가 생긴다.
    photos: ({ id }, { page }, { client }) => {
      return client.hashtag.findUnique({ where: { id } }).photos();
    },
    //"#food"라는 해쉬태그가 몇장에 사진에 포함되어있는지를 확인하는 코드
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({
        where: { hashtags: { some: { id } } },
      }),
  },
};

export default resolvers;
