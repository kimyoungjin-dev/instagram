import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser, client }) => {
        if (!loggedInUser) {
          return {
            ok: false,
            error: "There is no user information.",
          };
        }
        const findPhoto = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });

        if (!findPhoto) {
          return {
            ok: false,
            error: "Can`t find Photo",
          };
        }
        await client.comment.create({
          data: {
            //payload, user, photo 필수이다.
            payload,
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id: photoId } },
          },
        });
      }
    ),
  },
};
