import { gql } from "apollo-server";

export default gql`
  type Query {
    seePhotoLikes(id: Int!): [User]
  }
`;

//id 를 받아서 "Like"배열을 return
