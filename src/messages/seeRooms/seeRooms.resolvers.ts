import { protectedResolver } from "../../users/users.utils";

//우리가 들어가있는 대화방을 모두가져온다.

//protectedResolver => 누가로그인 했는지 알아야하기때문에 사용해준다.
export default {
  Query: {
    seeRooms: protectedResolver(
      async (_, __, { loggedInUser, client }) =>
        await client.room.findMany({
          where: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        })
    ),
  },
};
