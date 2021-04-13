import { gql } from "apollo-server";

export default gql`
  type SearchPhotosResult {
    ok: Boolean!
    error: String
    searchPhoto: [Photo]
    totalPhoto: Int
    totalPages: Int
  }
  type Query {
    searchPhotos(keyword: String!, page: Int!): SearchPhotosResult!
  }
`;
