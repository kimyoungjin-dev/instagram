import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    user: User!
    payload: String!
    room: Room!
    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: Int!
    user: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
