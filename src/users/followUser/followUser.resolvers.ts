import { protectedResolver } from "../users.utils";

// 접근방법 : user를 찾는다. => 유저가 존재하지않는다면 return false! => update를 사용해준다. (업데이트유저 : user1) (connect : user2)
export default {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const checkUser = await client.user.findUnique({
          where: {
            username,
          },
          //id 의 정보만을 가져온다.
          select: { id: true },
        });
        console.log(checkUser);
        if (!checkUser) {
          return {
            ok: false,
            error: "Cant find User",
          };
        }
        await client.user.update({
          //누가 팔로윙을 할꺼냐" => where
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
