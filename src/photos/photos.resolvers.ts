import { Resolvers } from "../types";

const resolver: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),

    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: { photos: { some: { id } } },
      }),

    //포토의 id가 입력받은 아이디와 인자로 받은 아이디와 같다면 그것의 갯수를 센다
    likes: ({ id }, _, { client }) =>
      client.like.count({
        where: { photoId: id },
      }),

    //사진의 "id"가 "comment"를 작성하는 사진의 id와 일치해야한다.
    //commentNumber: photo에 붙어있는 comment의 갯수를 센다.
    commentNumber: ({ id }, _, { client }) =>
      client.comment.count({
        where: { photoId: id },
      }),

    //comments: 유일한 photo의 id에서 comments를 찾는다.
    comments: ({ id }, _, { client }) =>
      client.photo.findUnique({ where: { id } }).comments(),

    //loggedInUser는 항상 체크를 해주어야한다.
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },

    //로그인이 되어있지않는다면 좋아요를 누를수없다.
    //photo로 부터 아이디를 얻고,
    isLiked: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) return false;

      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: { id: true },
      });
      if (ok) {
        return true;
      }
      return false;
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
