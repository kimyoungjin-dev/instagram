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
        const photo = await client.photo.findUnique({
          where: { id },
        });
        console.log(photo); //"출력" obj 아이디 : 11
        //client.photo => 플라즈마 photo에서 만약 사진의 id를 찾지못하면 return false
        if (!photo) {
          return {
            ok: false,
            error: "Cant found Photo",
          };
        }
        //like를 정의

        //코드재활용
        const likeWhere = {
          photoId_userId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        };

        const like = await client.like.findUnique({ where: likeWhere });
        //like 가 존재하는경우 삭제
        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
          //like 가 존재하지않는경우 생성
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } }, //좋아요가 없는 경우 id는 로그인한 유저의 아이디
              photo: { connect: { id: photo.id } }, //사진에 좋아요가 없는경우에는 좋아요를 누를 "그!사진"의 아이디를 준다
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
