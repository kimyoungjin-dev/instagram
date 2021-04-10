import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
//parsing : 캡션 문장안에 해쉬태그 키워드들만 추출해내는것
//parsing => "caption"이 존재 + caption에 "해쉬테그" 존재 => Hashtages를 생성 => 해당 "hashtag"가 존재하는지 확인하고 => "get" or "create" 작업 => 마지막에 parsing 된 해쉬테크와 함께 "저장"=> 사진을 "hashtags" 에도 "저장"
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        //Regular Expression: 문자내에서 특정 문자를 추출한다.
        //caption 이 존재를 해야만 parsing 을 할수있다.
        //if 문안에서는 "hashtagObj" 를 전달할수없으므로 위에서 선언해준다.
        let hashtagObj = [];
        if (caption) {
          const hashtag = caption.match(/#[\w]+/g);
          hashtag.map((item) => ({
            where: { item },
            create: { item },
          }));
        }
        //connectOrCreate 배열로 만들수있다.
        //만약#hashtag 가 존재를 한다면 "where"을 사용하고, 새로생성 해야된다면 "create"를 사용한다.
        //map함수의 반환값은 배열이기때문에 connectOrCreate의 시작배열을 지워준다.
        client.photo.create({
          data: {
            file,
            caption,
            //해쉬테그가 존재를 하는경우에는 connectOrCreate은  hashtagObj함수를 사용해준다.
            ...(hashtagObj.length > 0 && {
              hashtags: { connectOrCreate: hashtagObj },
            }),
          },
        });
      }
    ),
  },
};
