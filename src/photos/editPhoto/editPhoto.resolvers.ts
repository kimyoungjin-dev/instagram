import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

//1.수정 하고자 하는 사진을 찾는다. => 새로운 캡션에서 #를 추출 => connect => disconnect 로 끊는다 =>
export default {
  Mutation: {
    editPhoto: protectedResolver(
      //id =플레이그라운드에 입력하는 아이디
      async (_, { id, caption }, { loggedInUser, client }) => {
        const prevPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          //prevPhoto에는 hashtag가 존재하지않으므로 include 속성을 사용해서 hashtag를 불러온다
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        //prevPhoto는 기존의 hashtag를 가져올수있다.

        //만약 사진의 사진을 보유하고있는 userId 와 loggedInUser 의 id가 일치하지않으면 일치하지않는다는 애러를 return 한다.
        if (!prevPhoto) {
          return {
            ok: false,
            error: "Login user and current user do not match.",
          };
        }

        await client.photo.update({
          //하나의 사진의 고유한 id가 존재하고 해당아이디의 사진의 caption 만을 수정한다.
          where: { id },
          data: {
            caption,
            //prevPhoto.hashtags를 사용하면 모든 해쉬테크를 disconnect 할수있다.
            hashtags: {
              //연결 을 취소한후에
              disconnect: prevPhoto.hashtags,
              //연결을 다시 새로운 해쉬테크를 만들어준다.
              connectOrCreate: processHashtags(caption),
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

//여기까지만 해서 studio 를 켜서 확인해보면 , 해쉬태그가 없는 문장에서 그전의 해쉬테크가 남아있는것을 확인 할수있다.
