import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      //먼저 유저를 찾는다.
      //findFirst? findUnique?
      const findUser = await client.user.findUnique({
        where: { username },
      });
      //유저를 발견 못할경우
      if (!findUser) {
        return {
          ok: false,
          error: "Cant find User",
        };
      }
      //비밀번호 체크
      const checkPassword = await bcrypt.compare(password, findUser.password);
      if (!checkPassword) {
        return {
          ok: false,
          error: "Passwords do not match.",
        };
      }
      //signd의 {} 주의
      const token = await jwt.sign({ id: findUser.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
