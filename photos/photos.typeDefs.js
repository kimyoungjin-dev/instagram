import { gql } from "apollo-server";
//스키마의 user id 는 그래프ql 에서는 필요하지않는다.
export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]!
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    photos: [Photo]!
    hashtag: String!
    createdAt: String!
    updatedAt: String!
  }
`;

//type Hashtag는 type Photo와 관련이 깊기때문에, photo.typeDefs.js 에 작성해준다.

//커맨드 나중에 추가
//좋아요버튼은 사진이 존재하지않아도 되기때문에 별도로 만들어준다.
