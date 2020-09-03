export default {
  Query: {
    getTeam: (parents, { id }, { models }) => models.Team.findOne({ where: id }),
  },
  Mutation: {
    createTeam: (parents, args, { models, user }) => models.Team.create({ ...args, owner: user.id }),
  },
};
