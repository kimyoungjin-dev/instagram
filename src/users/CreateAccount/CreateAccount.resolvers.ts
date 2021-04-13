import { Resolvers } from "../../types";
import * as bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        const existUser = await client.user.findFirst({
          where: {
            OR: [
              {
                email,
              },
              {
                username,
              },
            ],
          },
        });
        if (existUser) {
          return {
            ok: false,
            error: "이미계정이 존재합니다",
          };
        }

        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          //data 에는 필수조건들을 넣어줘야한다.
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Can't create an account.",
        };
      }
    },
  },
};

export default resolvers;
