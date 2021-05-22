import { protectedResolver } from "../../users/users.utils";

//유저가 누구인지 알아야하기때문에 protectedResolver 사용

//"photo"를 찾을때 나의 아이디가 팔로워 목록에있는 유저의 photo를 찾으면 된다.
export default {
  Query: {
    seeFeed: protectedResolver((_, { offset }, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return null;
      }
      return client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            //userId을 사용해준다.
            { userId: loggedInUser.id },
          ],
        },
        take: 2,
        skip: offset,
      });
    }),
  },
};
