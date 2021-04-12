import { gql } from "apollo-server-core";

//접근 방법 : 어떤 photo 에 comment를 작성 할지 생각
export default gql`
  type Mutation {
    createComment(photoId: Int!, payload: String!): MutationResponse!
  }
`;
