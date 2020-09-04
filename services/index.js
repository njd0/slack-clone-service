import authServiceFactory from './auth';

export default function initServices(models) {
  const authService = authServiceFactory(models);

  return {
    authService,
  };
}
