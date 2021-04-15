import { protectedResolver } from "../../users/users.utils";

//접근방법: id를 가진 대화방을 찾는다. (loggedUser는 대화방에 포함) =>
export default {
  Query: {
    seeRoom: protectedResolver(async (_, { id }, { client, loggedInUser }) =>
      //id로 대화방을 찾는다. 또한 찾은 id의 방은 사용자가 들어가있는 방이다.
      client.room.findFirst({
        where: { id, users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};
