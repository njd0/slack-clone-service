export default {
  Mutation: {
    createMessage: (parents, args, { models, user }) => models.Message.create({ ...args, userId: user.id }),
  },
};
