import { gql } from "apollo-server";

export default gql`
  type Query {
    seePhoto(id: Int!): Photo
  }
`;

// 사진을 찾지못할수도있기때문에 Photo에 required를 하지않는다
