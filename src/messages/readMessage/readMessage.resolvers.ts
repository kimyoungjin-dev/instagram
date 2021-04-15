import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(
      async (__, { id }, { client, loggedInUser }) => {
        const message = await client.message.findFirst({
          where: {
            id,
            userId: { not: loggedInUser.id },
            room: { users: { some: { id: loggedInUser.id } } },
          },
        });
        if (!message) {
          return {
            ok: false,
            error: "Message not found",
          };
        }
        await client.message.update({
          where: { id },
          data: {
            read: true,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
