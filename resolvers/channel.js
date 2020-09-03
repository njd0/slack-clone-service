export default {
  Mutation: {
    createChannel: (parents, args, { models }) => models.Channel.create(args),
  },
};
