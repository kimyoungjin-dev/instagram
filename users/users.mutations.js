import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existringUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existringUser) {
          throw new Error("이미 계정이 존재합니다");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },

    login: async (_, { username, password }) => {
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
