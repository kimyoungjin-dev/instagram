import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser, client }) =>
      client.user.findUnique({
        where: { id: loggedInUser.id },
      })
    ),
  },
};
