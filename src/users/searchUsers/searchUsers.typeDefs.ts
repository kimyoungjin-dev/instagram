import { gql } from "apollo-server";

export default gql`
  type SearchUsersResults {
    ok: Boolean!
    error: String
    searchUser: [User]
    totalUser: Int
    totalPages: Int
  }

  type Query {
    searchUsers(keyword: String!, lastId: Int): SearchUsersResults!
  }
`;
