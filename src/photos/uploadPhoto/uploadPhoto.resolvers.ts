import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          const hashtag = caption.match(/#[\w]+/g);
          hashtagObjs = hashtag.map((item) => ({
            where: { item },
            create: { item },
          }));
        }

        return client.photo.create({
          data: {
            file,
            caption,
            //유저 또한 connect를 해줘야한다.
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        });
      }
    ),
  },
};
