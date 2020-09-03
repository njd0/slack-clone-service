export default {
  Query: {
    getUser: (parents, { id }, { models }) => models.User.findOne({ where: id }),
    getUsers: (parents, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    createUser: (parents, args, { models }) => models.User.create(args),
  },
};
