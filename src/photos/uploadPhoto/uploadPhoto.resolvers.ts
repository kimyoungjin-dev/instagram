import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        if (!loggedInUser) {
          return null;
        }
        console.log(loggedInUser);
        let hashtagObj = [];
        console.log(hashtagObj);
        if (caption) {
          //caption 에는 한글을 사용하지못한다.
          //hashtag:hashtag임에 주의하자
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        return await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};
