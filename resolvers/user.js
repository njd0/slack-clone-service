import _ from 'lodash';

const formatErrors = (e, models) => {
  // console.log("models.sequelize", models.Sequelize.ValidationError)
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
  Query: {
    getUser: (parents, { id }, { models }) => models.User.findOne({ where: id }),
    getUsers: (parents, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parents, { email, password }, { services, SECRET, REFRESHSECRET }) => (
      services.authService.login(email, password, SECRET, REFRESHSECRET)
    ),
    register: async (parents, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          user,
        };
      } catch (err) {
        return {
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
