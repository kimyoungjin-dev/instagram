import { gql } from "apollo-server";

export default gql`
  type EditPhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editPhoto(id: Int!, caption: String!): EditPhotoResult!
  }
`;

//id는 어떤 사진을 수정하고싶은지 알아야하기때문에, 적어준다.

//Mutation 을 작성할때에는 "EditPhotoResult" 과 같이 리턴타입을 직접 만든다.

//예를 들어 사진 검색 같은 경우에는 찾으려는 사진이 존재하지않는 경우에는 return null 을 반환하면 된다.
