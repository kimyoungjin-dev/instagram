export default {
  User: {
    totalFollowing: (root) => {
      console.log(root.email);
      return 0;
    },
  },
};
