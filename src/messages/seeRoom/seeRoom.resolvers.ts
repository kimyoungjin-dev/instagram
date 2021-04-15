import { protectedResolver } from "../../users/users.utils";

//접근방법: id를 가진 대화방을 찾는다. (loggedUser는 대화방에 포함)
export default {
  Query: {
    seeRoom: protectedResolver(
      async (_, { id }, { client, loggedInUser }) =>
        await client.room.findFirst({
          where: { id, users: { some: { id: loggedInUser.id } } },
        })
    ),
  },
};
