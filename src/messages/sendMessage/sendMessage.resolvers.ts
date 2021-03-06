import { NEW_MESSAGE } from "../../constans";
import pubSub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";
//접근 방법 :
//조건 1)userId가 존재하는경우 => user를 찾는다 => room을 만든다 => 새로운 메시지를 만든다.
//조건 2) roomId가 존재를 하는경우 => room id를 찾는다 => 새로운 메시지를 보낸다
export default {
  Mutation: {
    sendMessage: protectedResolver(
      //userId : 내가 보낼 상대방이 아이디
      async (_, { payload, roomId, userId }, { client, loggedInUser }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }

          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found.",
            };
          }
        }

        //메시지를 만들면  => room을 연결 and 유저를 연결!

        const message = await client.message.create({
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
        pubSub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return {
          ok: true,
        };
      }
    ),
  },
};
