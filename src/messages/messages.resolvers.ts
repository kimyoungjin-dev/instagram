import { Resolvers } from "../types";

//채팅방 안에 상황보여준다고 이해
const resolvers: Resolvers = {
  Room: {
    //해당 room에 속해있는 user들을 보여준다.
    users: ({ id }, _, { client }) =>
      client.room.findUnique({ where: { id } }).users(),

    //많은 메시지들이 있는 방을 찾는다.
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),

    //내가 보낸메시지가 아닌 메시지들의 갯수를 센다 ( 방의 id도 필요, read : false로 설정)
    unreadTotal: ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loggedInUser.id } },
        },
      });
    },
  },

  Message: {
    user: ({ id }, _, { client }) =>
      client.message.findUnique({ where: { id } }).user(),
  },
};

export default resolvers;
