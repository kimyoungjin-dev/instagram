import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const checkUser = await client.user.findFirst({ where: { username } });
      if (!checkUser) {
        return {
          ok: false,
          error: "유저를 찾을수가없습니다.",
        };
      }

      const checkPassword = await bcrypt.compare(password, checkUser.password);
      if (!checkPassword) {
        return {
          ok: false,
          error: "패스워드가 틀렸습니다.",
        };
      }

      const token = await jwt.sign(
        { id: checkUser.id },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
      };
    },
  },
};
export default resolvers;
