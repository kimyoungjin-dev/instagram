import { gql } from "apollo-server";

export default gql`
  type Query {
    seePhotoLikes(id: Int!): [User]
  }
`;

//사진의 아이디를 받아서 유저를 반환한다.
