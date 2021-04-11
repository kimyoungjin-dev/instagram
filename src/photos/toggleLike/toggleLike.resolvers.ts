import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

//먼저 로그인된 유저만 "좋아요"를 누를수있다.=> "좋아요"가 있는 경우에는 "좋아요"를 누를수없다  or "좋아요"가 없는 경우에는 새로운 "좋아요"를 만든다.

// 좋아요 취소를 원하는경우 =>  "* 좋아요가 이미 있는경우 *"에만 취소가 가능하도록 한다.

//결론 "좋아요" // "싫어요" 두경우 모두 "좋아요"가 존재하는지 확인해야한다.

//사진에 좋아요가 있는지 체크하는 resolver를 만든다.
const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        //client.photo => 플라즈마 photo에서 만약 사진의 id를 찾지못하면 return false
        const ok = await client.photo.findUnique({
          where: { id },
        });
        console.log(ok);
        if (!ok) {
          return {
            ok: false,
            error: "Cant found Photo",
          };
        }
      }
    ),
  },
};

export default resolvers;
