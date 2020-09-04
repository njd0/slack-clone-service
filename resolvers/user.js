import bcrypt from 'bcryptjs';
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
    login: (parents, { email, password }, { services, SECRET }) => services.authService.login(email, password, SECRET),
    register: async (parents, { password, ...args }, { models }) => {
      try {
        if (password.length < 5 || password.length > 100) {
          return {
            errors: [{ path: 'password', message: 'The password needs to be between 5 and 100 characters long' }],
          };
        }

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await models.User.create({ ...args, password: hashedPassword });
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
