import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

export default function authServiceFactory(models) {
  const createTokens = async (user, secret, refreshSecret) => {
    const createToken = jwt.sign(
      {
        user: _.pick(user, ['id']),
      },
      secret,
      {
        expiresIn: '1h',
      },
    );

    const createRefreshToken = jwt.sign(
      {
        user: _.pick(user, 'id'),
      },
      refreshSecret,
      {
        expiresIn: '7d',
      },
    );

    return [createToken, createRefreshToken];
  };

  const refreshTokens = async (token, refreshToken, SECRET) => {
    let userId = -1;
    try {
      const { user: { id } } = jwt.decode(refreshToken);
      userId = id;
    } catch (err) {
      return {};
    }

    if (!userId) {
      return {};
    }

    const user = await models.User.findOne({ where: { id: userId }, raw: true });

    if (!user) {
      return {};
    }

    try {
      jwt.verify(refreshToken, user.refreshSecret);
    } catch (err) {
      return {};
    }

    const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user,
    };
  };

  const login = async (email, password, SECRET, REFRESHSECRET) => {
    const user = await models.User.findOne({ where: { email }, raw: true });
    if (!user) {
      throw new Error('Invalid email and/or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid email and/or password');
    }

    const refreshTokenSecret = user.password + REFRESHSECRET;

    const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

    return {
      token,
      refreshToken,
    };
  };

  return {
    login,
    refreshTokens,
  };
}
