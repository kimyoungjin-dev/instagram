import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver(
      async (_, __, { loggedInUser, client }) =>
        await client.user.findUnique({
          where: { id: loggedInUser.id },
        })
    ),
  },
};
