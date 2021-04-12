import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser, client }) => {
        if (!loggedInUser) {
          return {
            ok: false,
            error: "There is no user information.",
          };
        }
        const prevPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          //include 를 이용해서 hastag를 포함하시고 , hashtag안에있는 hashtag만을 가져온다.
          include: {
            hashtags: { select: { hashtag: true } },
          },
        });

        if (!prevPhoto) {
          return {
            ok: false,
            error: "Cant found photo",
          };
        }
        //해당 아이디으 caption 을 변경한다.
        await client.photo.update({
          //필터는 사진의 id
          where: { id },
          //바꿀내용은 caption
          data: {
            caption,
            hashtags: {
              disconnect: prevPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
