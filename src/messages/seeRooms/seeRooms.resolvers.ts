import { protectedResolver } from "../../users/users.utils";

//우리가 들어가있는 대화방을 모두가져온다.
//protectedResolver => 누가로그인 했는지 알아야하기때문에 사용해준다.
//채팅방의 아이디 + 로그인된 유저의 아디
export default {
  Query: {
    seeRooms: protectedResolver(async (_, { id }, { client, loggedInUser }) =>
      client.room.findMany({
        where: { id, users: { some: { id: loggedInUser.id } } },
      })
    ),
  },
};
