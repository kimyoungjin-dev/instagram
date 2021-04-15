import { protectedResolver } from "../../users/users.utils";
//접근 방법 :
//조건 1)userId가 존재하는경우 => user를 찾는다 => room을 만든다 => 새로운 메시지를 만든다.
//조건 2) roomId가 존재를 하는경우 => room id를 찾는다 => 새로운 메시지를 보낸다
export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser, client }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: { id: true },
          });
          if (!userId) {
            return {
              ok: false,
              error: "Cant exist User",
            };
          }
          //유저가 존재를 하고 메시지를 보내는 경우에 "room"을 만든다.
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: user.id,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
          //room의 아이디가 존재하는경우 roomId를 찾는다.
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });

          //만약 room 이 존재하지않는다면 return false
          if (!room) {
            return {
              ok: false,
              error: "room not find",
            };
          }
        }
        await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
