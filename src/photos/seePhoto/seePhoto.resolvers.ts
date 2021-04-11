import { Resolvers } from "../../types";

//모든 사람이 사진을 볼수있기 때문에 protectResolvers x
const resolvers: Resolvers = {
  Query: {
    seePhoto: (_, { id }, { client }) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};
export default resolvers;
