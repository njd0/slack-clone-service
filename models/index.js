import Sequelize from 'sequelize';

const config = {
  database: 'slack',
  username: 'postgres',
  password: 'postgres',
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const models = {
  User: require('./user').default(sequelize, Sequelize),
  Channel: require('./channel').default(sequelize, Sequelize),
  Message: require('./message').default(sequelize, Sequelize),
  Team: require('./team').default(sequelize, Sequelize),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
