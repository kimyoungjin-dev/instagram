import { protectedResolver } from "../../users/users.utils";

//parsing : 캡션 문장안에 해쉬태그 키워드들만 추출해내는것
//parsing 작업 => "caption"이 존재 + caption에 "해쉬테그" 존재 => Hashtages를 생성 => 해당 "hashtag"가 존재하는지 확인하고 => "get" or "create" 작업 => 마지막에 parsing 된 해쉬테크와 함께 "저장"=> 사진을 "hashtags" 에도 "저장"
export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          ///
        }
      }
    ),
  },
};
