import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        if (!loggedInUser) {
          return {
            ok: false,
            error: "The user does not exist.",
          };
        }

        const comments = await client.comment.findUnique({
          where: { id },
          //select 를 이용해서 userId만을 가지고온다.
          select: { userId: true },
        });

        if (!comments) {
          return {
            ok: false,
            error: "The comment does not exist.",
          };
        } else if (loggedInUser.id !== comments.userId) {
          return {
            ok: false,
            error: "The login user and comment author do not match.",
          };
        } else {
          //인자로 받은 id와 comments의 id가 일치하면 삭제한다.
          await client.comment.delete({
            where: { id },
          });

          return {
            ok: true,
          };
        }
      }
    ),
  },
};
