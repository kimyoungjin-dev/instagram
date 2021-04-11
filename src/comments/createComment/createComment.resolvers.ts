import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser, client }) => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Cant found Photo",
          };
        }

        await client.comment.create({
          //생성
          data: {
            payload,
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id: photoId } },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
