import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constans";
import { withFilter } from "graphql-subscriptions";
import client from "../../client";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        //findUnique => findFirst , users 에서 id :loggedInUser.id로 설정해준다
        const room = await client.room.findFirst({
          where: {
            //해당 id의 방을 찾는다
            id: args.id,
            //room에 리스니 하려고 하하는 user가 있는지 체크
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        //room이 존재하지않는경우 subscription field는 async iterable 을 return 해야한다 즉 => return null 을 사용하면 안된다.
        if (!room) {
          throw new Error("You shall not see this");
        }
        //만약 room이 존재하지않는다면 => roomUpdate를 리스닝 하지못하도록 작동
        //subscribe는 아래 return 부분에는 function을 리턴하는것이 아닌, function을 호출한다.
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            //roomUpdates.roomId는 sendMessage로 부터 publish할때 온다.
            if (roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: { id, users: { some: { id: loggedInUser.id } } },
                select: { id: true },
              });
              if (!room) {
                return false;
              }
            }
            return true;
          }
        )(root, args, context, info);
      },
    },
  },
};

//asyncIterator는 trigger들을 listen한다. => NEW_MESSAGE(triggers) 타입:string

//어떤것에 대해서 listen 하고, 새메시지를 받는 순간, 새로운 메시지에 대한 payload 를 받는다.
//pubsub의 publish 부분은 sendMessage에서 만든다.
//asyncIterator를 이벤트의 이름과 함께 return //이벤트의 "이름"과 "payload" 는 sendMessage에서 publish 한다.

//withFilter는 2개의 인자를 갖는다. 1. iterator 2.true를 return하는 함수
//withFilter가 true를 return 한다면 user는 업데이트를 받는다.
//withFilter의 2번째 함수의 2번째 인자는 "payload" 와, "variables"

//room 이 존재하지않아도, room이 listening.. 하게 둘것인가
