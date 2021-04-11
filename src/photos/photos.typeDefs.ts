import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    likes: Int!
    comments: Int!
    isMine: Boolean!
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

//model 안에 있는 Like 값을 모두 적어줄 필요는 없다.
