import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id },
        });
        console.log(photo);
        if (!photo) {
          return {
            ok: false,
            error: "Cant find Photo",
          };
        }

        const simpleWhere = {
          photoId_userId: { userId: loggedInUser.id, photoId: id },
        };

        const likeCheck = await client.like.findUnique({
          where: simpleWhere,
        });
        if (likeCheck) {
          await client.like.delete({
            where: simpleWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              //photo.id 임에 주의하자.
              photo: { connect: { id: photo.id } },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
