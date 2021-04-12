import { Resolvers } from "../types";

const resolver: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),

    hashtags: ({ id }, _, { client }) => {
      //root의 id는 현재 내가찾고자하는 사진의 아이디이다. 이 아이디와 일치하는 아이디는 hashtag의 photos의 id 를 가지고있는 해쉬태그들만을 모아서 값을 보여준다.
      return client.hashtag.findMany({ where: { photos: { some: { id } } } });
    },

    //사진의 좋아요 갯수랑 세는 likes를 작성
    // photoId = photo id 와 같은 like 갯수를 센다.
    likes: ({ id }, _, { client }) => {
      return client.like.count({
        where: { photoId: id }, //11번의 아이디를 가지고있는 사진의 like 개수를 센다.
      });
    },

    //사진의 "id"가 "comment"를 작성하는 사진의 id와 일치해야한다.
    comments: ({ id }, __, { client }) =>
      client.comment.count({
        where: { photoId: id },
      }),
  },

  //#avocado :id=15, 15아이디를 photo()에서 찾는다.
  Hashtag: {
    photos: ({ id }, { page }, { client }) =>
      client.hashtag
        .findUnique({
          where: { id },
        })
        .photos({
          take: 5,
          skip: (page - 1) * 5,
        }),

    //하나의 #에 포함된 사진의 갯수를 센다
    totalPhotos: ({ id }, __, { client }) =>
      client.photo.count({
        where: { hashtags: { some: { id } } },
      }),
  },
};

export default resolver;
