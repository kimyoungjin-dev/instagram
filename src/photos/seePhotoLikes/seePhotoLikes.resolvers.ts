import { Resolvers } from "../../types";

//"slect" 와 "inclue"의 차이점 : include : 결과에 relationship 을 추가 // select 받고싶은 데이터를 선택  //두개중 하나만 사용가능

//좋아요를 누른 user 의 username 만을 보여준다.
const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id }, { client }) => {
      const likeList = await client.like.findMany({
        //photoId:id => 사진의 id = 11 => 사진의 아이디를 골라준다.
        where: { photoId: id },
        select: { user: true },
      });
      console.log(likeList);
      return likeList.map((item) => item.user);
    },
  },
};

export default resolvers;
