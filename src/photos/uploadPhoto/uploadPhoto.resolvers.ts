import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        if (!loggedInUser) {
          return null;
        }
        //caption 에는 한글을 사용하지못한다.
        //hashtag:hashtag임에 주의하자
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
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
