import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        //찾고자하는 "loggedInUser" 가 없는 경우 return

        if (!loggedInUser) {
          return {
            ok: false,
            error: "Can`t find User",
          };
        }
        const findPhoto = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });

        //찾고자하는 "Photo"가 없는 경우 return
        if (!findPhoto) {
          return {
            ok: false,
            error: "Cant find Photo",
          };
        }

        //else if 사용 이유: 사진을 찾아도 사진의 주인인지 체크해야한다.
        else if (findPhoto.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "The login user and the current user do not match.",
          };
        }

        //모든게 맞다면 return true
        await client.photo.delete({
          where: { id },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
