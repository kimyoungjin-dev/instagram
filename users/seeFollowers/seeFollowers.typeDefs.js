import { gql } from "apollo-server";
export default gql`
  type seeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }

  type Query {
    seeFollowers(username: String!, page: Int!): seeFollowersResult!
  }
`;

//**영진을 팔로워하고있는 사람들의 목록을 보여준다**

// prev: {
//   seeFollowers(username:"youngjin", page:1){
//     ok
//     followers{id}
//     totalPages
//   }
// }

// after : {
//   "data": {
//     "seeFollowers": {
//       "ok": true,
//       "followers": [
//         {
//           "id": 2
//         },
//         {
//           "id": 9
//         },
//         {
//           "id": 11
//         },
//         {
//           "id": 13
//         },
//         {
//           "id": 15
//         }
//       ],
//       "totalPages": 2
//     }
//   }
// }
