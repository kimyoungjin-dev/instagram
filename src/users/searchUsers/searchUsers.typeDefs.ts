import { gql } from "apollo-server";

export default gql`
  type SearchUsersResults {
    ok: Boolean!
    error: String
    searchUser: [User]
  }

  type Query {
    searchUsers(keyword: String!, lastId: Int): SearchUsersResults!
  }
`;
