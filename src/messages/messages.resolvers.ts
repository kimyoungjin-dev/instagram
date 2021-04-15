import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    //해당 room에 속해있는 user들을 보여준다.
    user: ({ id }, _, { client }) =>
      client.room.findUnique({ where: id }).users(),

    //많은 메시지들이 있는 방을 찾는다.
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),

    unreadTotal: ({ id }, _, { client }) => {},
  },
};

export default resolvers;
