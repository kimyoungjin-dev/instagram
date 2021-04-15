import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constans";
import { withFilter } from "graphql-subscriptions";

//asyncIterator는 trigger들을 listen한다. => NEW_MESSAGE(triggers) 타입:string
export default {
  Subscription: {
    roomUpdates: {
      //어떤것에 대해서 listen 하고, 새메시지를 받는 순간, 새로운 메시지에 대한 payload 를 받는다.
      //pubsub의 publish 부분은 sendMessage에서 만든다.
      //asyncIterator를 이벤트의 이름과 함께 return //이벤트의 "이름"과 "payload" 는 sendMessage에서 publish 한다.

      //withFilter는 2개의 인자를 갖는다. 1. iterator 2.true를 return하는 함수
      //withFilter가 true를 return 한다면 user는 업데이트를 받는다.
      //withFilter의 2번째 함수의 2번째 인자는 "payload" 와, "variables"
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates }, { id }) => {
          return roomUpdates.roomId === id;
        }
      ),
      //room 이 존재하지않아도, room이 listening.. 하게 둘것인가?
    },
  },
};
