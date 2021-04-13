import { Resolvers } from "../types";

const resolver: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),

    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: { photos: { some: { id } } },
      }),

    // hashtags: ({ id }, _, { client }) => {
    //   //root의 id는 현재 내가찾고자하는 사진의 아이디이다. 이 아이디와 일치하는 아이디는 hashtag의 photos의 id 를 가지고있는 해쉬태그들만을 모아서 값을 보여준다.
    //   return client.hashtag.findMany({ where: { photos: { some: { id } } } });
    // },

    //포토의 id가 입력받은 아이디와 인자로 받은 아이디와 같다면 그것의 갯수를 센다
    likes: ({ id }, _, { client }) =>
      client.like.count({
        where: { photoId: id },
      }),

    //사진의 "id"가 "comment"를 작성하는 사진의 id와 일치해야한다.
    comments: ({ id }, _, { client }) =>
      client.comment.count({
        where: { photoId: id },
      }),
    //loggedInUser는 항상 체크를 해주어야한다.
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },

  //#avocado :id=15, 15아이디를 photo()에서 찾는다.
  Hashtag: {
    //hashtag 의 id //pagination 을 필수로 사용해줘야한다.
    photos: ({ id }, { page }, { client }) =>
      client.hashtag
        .findUnique({
          where: { id },
        })
        .photos({
          take: 5,
          skip: (page - 1) * 5,
        }),

    // 하나의 #에 포함된 사진의 갯수를 센다
    totalPhotos: ({ id }, __, { client }) =>
      client.photo.count({
        where: { hashtags: { some: { id } } },
      }),
  },
};

export default resolver;
