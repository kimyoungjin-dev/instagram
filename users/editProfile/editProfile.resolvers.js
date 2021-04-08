import bcrypt from "bcrypt";
import client from "../../client";
import { protectUser } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio },
  { loggedInUser, protectUser }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "수정하는 과정에서 오류가 발생하였습니다.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectUser(resolverFn),
  },
};
