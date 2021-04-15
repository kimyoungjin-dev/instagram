import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constans";

//asyncIterator는 trigger들을 listen한다. => NEW_MESSAGE(triggers) 타입:string
export default {
  Subscription: {
    roomUpdates: {
      //어떤것에 대해서 listen 하고, 새메시지를 받는 순간, 새로운 메시지에 대한 payload 를 받는다.
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};
