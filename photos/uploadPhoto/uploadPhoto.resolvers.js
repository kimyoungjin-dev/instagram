import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
//parsing : 캡션 문장안에 해쉬태그 키워드들만 추출해내는것
//parsing 작업 => "caption"이 존재 + caption에 "해쉬테그" 존재 => Hashtages를 생성 => 해당 "hashtag"가 존재하는지 확인하고 => "get" or "create" 작업 => 마지막에 parsing 된 해쉬테크와 함께 "저장"=> 사진을 "hashtags" 에도 "저장"
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        //Regular Expression: 문자내에서 특정 문자를 추출한다.
        if (caption) {
          const hashtag = caption.match(/#[\w]+/g);
        }
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              //connectOrCreate 배열로 만들수있다.
              connectOrCreate: [
                //만약#food 가 존재를 한다면 where을 사용하고, 새로생성 해야된다면 create를 사용한다.
                { where: { hashtag: "#food" }, create: { hashtag: "#food" } },
              ],
            },
          },
        });
      }
    ),
  },
};
