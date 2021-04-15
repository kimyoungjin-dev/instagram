import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRooms: [Room]
  }
`;
//유저가 로그인 상태가 아닐수도있어서 !을 하지않는다.
