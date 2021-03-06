import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    likes: Int!
    comments: [Comment]
    commentNumber: Int!
    isMine: Boolean!
    isLiked: Boolean!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    totalPhotos: Int!
    photos(page: Int!): [Photo]
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
