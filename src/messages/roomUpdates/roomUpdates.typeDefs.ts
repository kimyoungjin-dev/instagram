import { gql } from "apollo-server";

export default gql`
  type Subscription {
    roomUpdates(id: Int!): Message
  }
`;

//id가 1인 room에서만 listen할수 있는지 알아보자

//app 에서 모든 메시지의 업데이트를 listening... 할수없다. ( id를 가진 room에서만 메시지를 listening ... 할수있다.)

//
